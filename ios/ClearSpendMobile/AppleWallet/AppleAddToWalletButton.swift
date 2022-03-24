//
//  AppleAddToWalletButton.swift
//  ClearSpendMobile
//
//  Created by Rory O'Connor on 23/03/22.
//

import Foundation
import PassKit

class AppleAddToWalletButton: UIView {

    var addPassButtonView: PKAddPassButton!

    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
    }

    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        setupView()
    }

    private func setupView() {
        addPassButtonView = PKAddPassButton.init(addPassButtonStyle: .blackOutline)
        self.addSubview(addPassButtonView)
    }

    override func layoutSubviews() {
        super.layoutSubviews()
        addPassButtonView.frame = self.bounds
    }
}

@objc (RCTAppleAddToWalletButtonViewManager)
class RCTAppleAddToWalletButtonViewManager: RCTViewManager {

    override static func requiresMainQueueSetup() -> Bool {
        return true
    }

    override func view() -> UIView! {
        return AppleAddToWalletButton()
    }

}
