// Android App / APK build scripts and configuration for Orbit LMS
// Package: uz.orbit.lms.app

export interface APKConfig {
  app_name: string;
  package_name: string;
  version_code: number;
  version_name: string;
  min_sdk: number;
  target_sdk: number;
  permissions: string[];
  features: string[];
}

export const ORBIT_ANDROID_CONFIG: APKConfig = {
  app_name: "Orbit LMS",
  package_name: "uz.orbit.lms.app",
  version_code: 1,
  version_name: "1.0.0",
  min_sdk: 24,
  target_sdk: 34,
  permissions: [
    "android.permission.INTERNET",
    "android.permission.ACCESS_NETWORK_STATE",
    "android.permission.FLAG_SECURE", // Hardware DRM & Screen capture protection
    "android.permission.VIBRATE"
  ],
  features: [
    "FLAG_SECURE: Skrinshot va video yozishni apparat darajasida bloklash",
    "PWA / WebAPK Standalone rejimi",
    "Dinamik Watermark va DRM xavfsiz video pleer",
    "O'quvchi, Ustoz va Admin kabinetlari"
  ]
};

export const GRADLE_BUILD_SNIPPET = `
apply plugin: 'com.android.application'

android {
    namespace "uz.orbit.lms.app"
    compileSdkVersion 34
    
    defaultConfig {
        applicationId "uz.orbit.lms.app"
        minSdkVersion 24
        targetSdkVersion 34
        versionCode 1
        versionName "1.0.0"
        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
`;
