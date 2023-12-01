use ic_cdk::api::management_canister::http_request::{
    http_request, HttpHeader, TransformArgs, HttpResponse
};

use ic_cdk_macros::{self, query};

#[query]
fn about() -> String {
    String::from("hi \n\
    This is messmage form vfnas. \n\
    \n\
    VFANS is a creator and user owned, blockchain-governed community \
    that incentivizes production of high quality contents for subscription. \
    VFANS allows creators and users to set up community rules, \
    credits community members based on contributions and \
    support collaboration among creators at the low operation costs. \
    ")
}

#[query]
fn transform(raw: TransformArgs) -> HttpResponse {

    let headers = vec![
        HttpHeader {
            name: "Content-Security-Policy".to_string(),
            value: "default-src 'self'".to_string(),
        },
        HttpHeader {
            name: "Referrer-Policy".to_string(),
            value: "strict-origin".to_string(),
        },
        HttpHeader {
            name: "Permissions-Policy".to_string(),
            value: "geolocation=(self)".to_string(),
        },
        HttpHeader {
            name: "Strict-Transport-Security".to_string(),
            value: "max-age=63072000".to_string(),
        },
        HttpHeader {
            name: "X-Frame-Options".to_string(),
            value: "DENY".to_string(),
        },
        HttpHeader {
            name: "X-Content-Type-Options".to_string(),
            value: "nosniff".to_string(),
        },
    ];
    

    let mut res = HttpResponse {
        status: raw.response.status.clone(),
        body: raw.response.body.clone(),
        headers,
        ..Default::default()
    };

    if res.status == 200 {

        res.body = raw.response.body;
    } else {
        ic_cdk::api::print(format!("Received an error from coinbase: err = {:?}", raw));
    }
    res
}