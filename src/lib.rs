use rand::distributions::{Alphanumeric, DistString};
use serde::{Deserialize, Serialize};
use worker::*;

#[derive(Deserialize, Serialize)]
struct ResponseData {
    length: u8,
    random_string: String,
}

#[event(fetch)]
pub async fn main(req: Request, _env: Env, _ctx: worker::Context) -> Result<Response> {
    if !matches!(req.method(), Method::Get) {
        return Response::error("Method Not Allowed", 405);
    }

    let random_string = Alphanumeric.sample_string(&mut rand::thread_rng(), 32);
    let data = ResponseData {
        length: random_string.len() as u8,
        random_string,
    };
    Response::from_json(&data)
}
