import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface CanisterHttpResponsePayload {
  'status' : bigint,
  'body' : Uint8Array | number[],
  'headers' : Array<HttpHeader>,
}
export interface HttpHeader { 'value' : string, 'name' : string }
export interface HttpResponsePayload {
  'status' : bigint,
  'body' : Uint8Array | number[],
  'headers' : Array<HttpHeader>,
}
export interface ICRC7NFT {
  'clean' : ActorMethod<[], undefined>,
  'deal_https_resp_test' : ActorMethod<[string, string], string>,
  'do_send_post' : ActorMethod<[string], string>,
  'getErrorLog' : ActorMethod<[], string>,
  'getSubNft2' : ActorMethod<[], bigint>,
  'getUpdate' : ActorMethod<[bigint], string>,
  'get_version' : ActorMethod<[], string>,
  'make_test' : ActorMethod<[], undefined>,
  'mintICRC7' : ActorMethod<[VFTParams], string>,
  'queryNfts' : ActorMethod<[string], string>,
  'query_balance' : ActorMethod<[], bigint>,
  'query_cycles_ledger' : ActorMethod<[], string>,
  'query_one_time' : ActorMethod<[], string>,
  'switch_timer' : ActorMethod<[boolean], undefined>,
  'test_query_one_time' : ActorMethod<[], string>,
  'transform' : ActorMethod<[TransformArgs], CanisterHttpResponsePayload>,
  'whoami' : ActorMethod<[], Principal>,
}
export interface TransformArgs {
  'context' : Uint8Array | number[],
  'response' : HttpResponsePayload,
}
export interface VFTParams {
  'sbt_get_time' : string,
  'sbt_membership_category' : string,
  'vft_count' : string,
  'reputation_point' : string,
  'vft_info' : string,
  'user_id' : string,
  'sbt_card_number' : string,
  'sbt_card_image' : string,
  'ic_account_id' : string,
}
export interface _SERVICE extends ICRC7NFT {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
