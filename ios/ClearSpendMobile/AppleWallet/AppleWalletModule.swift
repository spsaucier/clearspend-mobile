//
//  AppleWalletModule.swift
//  ClearSpendMobile
//
//  Created by Rory O'Connor on 21/02/22.
//

import Foundation
import PassKit
import Stripe
import Alamofire

@objc(AppleWalletModule)
class AppleWalletModule: RCTEventEmitter {

    public static var emitter: RCTEventEmitter!

    var accessToken: String = ""
    var cardId: String = ""
    var pushProvisioningContext: STPPushProvisioningContext?
    var rootPresentedVC: UIViewController?

    override static func requiresMainQueueSetup() -> Bool {
        return true
    }

    open override func supportedEvents() -> [String] {
        ["onProvisionSuccess", "onProvisionFailure"]
    }

    @objc func canAddPaymentPass(_ lastFour: NSString,
                                 resolver resolve: RCTPromiseResolveBlock,
                                 rejecter reject: RCTPromiseRejectBlock) {
        let canAdd = PKAddPaymentPassViewController.canAddPaymentPass()

        if canAdd == false {
            resolve(false)
            return
        }

        guard let last4 = RCTConvert.nsString(lastFour) else { return }

        let passLibrary = PKPassLibrary.init()
        let passes = passLibrary.passes()

        // Check if any passes match the given last4
        let existingPass = passes.first { pass -> Bool in
            let cardSuffix: String
            if #available(iOS 13.4, *) {
                cardSuffix = pass.secureElementPass?.primaryAccountNumberSuffix ?? "empty"
            } else {
                cardSuffix = pass.paymentPass?.primaryAccountNumberSuffix ?? "empty"
            }

            if cardSuffix == last4 {
                return true
            } else {
                return false
            }
        }

        if existingPass != nil {
            resolve(false)
            return
        }

        resolve(true)

    }

    // Reference to use main thread
    @objc func beginPushProvisioning(_ options: NSDictionary, accessToken: NSString, cardId: NSString) {
        DispatchQueue.main.async {
            self._beginPushProvisioning(options, accessToken: accessToken, cardId: cardId)
        }
    }

    func _beginPushProvisioning(_ options: NSDictionary, accessToken: NSString, cardId: NSString) {
        print("Options Provided:")
        print(options)

        let stripePublishableKey = ReactNativeConfig.env(for: "STRIPE_PUBLISHABLE_KEY")
        STPAPIClient.shared.publishableKey = stripePublishableKey

        // TODO return errors to react native
        guard let withName = RCTConvert.nsString(options["withName"]) else { return }
        guard let description = RCTConvert.nsString(options["description"]) else { return }
        guard let last4 = RCTConvert.nsString(options["last4"]) else { return }

        guard let token = RCTConvert.nsString(accessToken) else { return }
        guard let cId = RCTConvert.nsString(cardId) else { return }

        let config = STPPushProvisioningContext.requestConfiguration(
            withName: withName,  // the cardholder's name
            description: description,  // optional; a description of your card
            last4: last4,  // optional; the last 4 digits of the card
            brand: .visa  // optional; the brand of the card
        )
        print("Push provisioning config generated")
        print(config)
        self.accessToken = token
        self.cardId = cId

        #if targetEnvironment(simulator)
        let payController = STPFakeAddPaymentPassViewController(requestConfiguration: config, delegate: self)
        #else
        let payController = PKAddPaymentPassViewController(requestConfiguration: config, delegate: self)
        #endif

        let screen = UIApplication.shared.windows.filter { $0.isKeyWindow }.first
        let controller = screen?.rootViewController?.presentedViewController
        if controller == nil {
            screen?.rootViewController?.present(payController!, animated: true, completion: nil)
            self.rootPresentedVC = screen?.rootViewController
        } else {
            screen?.rootViewController?.presentedViewController?.present(
                payController!, animated: true, completion: nil)
            self.rootPresentedVC = screen?.rootViewController?.presentedViewController
        }
    }
}

extension AppleWalletModule: PKAddPaymentPassViewControllerDelegate {
    func addPaymentPassViewController(
        _ controller: PKAddPaymentPassViewController,
        generateRequestWithCertificateChain certificates: [Data],
        nonce: Data,
        nonceSignature: Data,
        completionHandler handler: @escaping (PKAddPaymentPassRequest) -> Void
    ) {
        self.pushProvisioningContext = STPPushProvisioningContext(keyProvider: self)
        // STPPushProvisioningContext implements this delegate method for you
        // by retrieving encrypted card details from the Stripe API.
        self.pushProvisioningContext?.addPaymentPassViewController(
            controller,
            generateRequestWithCertificateChain: certificates,
            nonce: nonce,
            nonceSignature: nonceSignature,
            completionHandler: handler)
    }

    func addPaymentPassViewController(
        _ controller: PKAddPaymentPassViewController, didFinishAdding pass: PKPaymentPass?,
        error: Error?
    ) {
        if error != nil {
            // TODO: send error codes back to JS
            sendEvent(withName: "onProvisionFailure", body: "error")
        } else {
            sendEvent(withName: "onProvisionSuccess", body: "success")
        }

        self.rootPresentedVC?.dismiss(animated: true, completion: nil)
    }
}

extension AppleWalletModule: STPIssuingCardEphemeralKeyProvider {
    func createIssuingCardKey(
        withAPIVersion apiVersion: String, completion: @escaping STPJSONResponseCompletionBlock
    ) {
        let apiUrl = ReactNativeConfig.env(for: "API_URL")
        print(apiUrl!)
        print(apiVersion)
        let headers: HTTPHeaders = [.authorization(bearerToken: self.accessToken)]
        AF.request(
            "\(apiUrl!)/cards/ephemeral-key",
            method: .post,
            parameters: ["apiVersion": apiVersion, "cardId": self.cardId],
            encoder: .json,
            headers: headers
        )
        .responseJSON { response in
            switch response.result {
            case .success:
                if let data = response.data {
                    do {
                        let obj =
                            // swiftlint:disable:next force_cast
                            try JSONSerialization.jsonObject(with: data, options: []) as! [AnyHashable: Any]
                        completion(obj, nil)
                    } catch {
                        completion(nil, error)
                    }
                }
            case let .failure(error):
                completion(nil, error)
            }
        }
    }
}
