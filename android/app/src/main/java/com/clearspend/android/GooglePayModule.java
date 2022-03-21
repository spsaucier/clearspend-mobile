package com.clearspend.android;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.os.Parcel;
import android.os.Parcelable;
import android.util.Log;

import java.util.Map;
import java.util.HashMap;

public class GooglePayModule extends ReactContextBaseJavaModule {
    GooglePayModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "GooglePayModule";
    }


    @ReactMethod
    public void test(String name, String location) {
        Log.d("GooglePayModule", "test called with name: " + name
                + " and location: " + location);
    }
}


// Need stripe + tapandpay SDK
//public class EphemeralKeyProvider extends PushProvisioningEphemeralKeyProvider implements Parcelable {
//
//}