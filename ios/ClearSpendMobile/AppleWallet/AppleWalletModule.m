//
//  AppleWalletModule.h
//  ClearSpendMobile
//
//  Created by Rory O'Connor on 21/02/22.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(AppleWalletModule, NSObject)

RCT_EXTERN_METHOD(canAddPaymentPass: (RCTPromiseResolveBlock *)resolve
                  rejecter:(RCTPromiseRejectBlock *)reject
                  )

RCT_EXTERN_METHOD(getPaymentPasses: (RCTPromiseResolveBlock *)resolve
                  rejecter:(RCTPromiseRejectBlock *)reject
                  )

RCT_EXTERN_METHOD(beginPushProvisioning: (NSDictionary *)options
                  accessToken:(NSString *)accessToken
                  cardId:(NSString *)cardId
                  )

@end
