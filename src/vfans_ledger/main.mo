import Debug "mo:base/Debug";
import Result "mo:base/Result";
import Option "mo:base/Option";
import Blob "mo:base/Blob";
import Error "mo:base/Error";
import Array "mo:base/Array";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Nat64 "mo:base/Nat64";
import Nat "mo:base/Nat";
import icp_ledger_canister "../lib/icp_ledger_canister";

actor {
  type icp_ledger_canister_ = icp_ledger_canister.Self;

  let icp_ledger_canister_holder : icp_ledger_canister_ = actor ("ryjl3-tyaaa-aaaaa-aaaba-cai");

  type blob = Blob;
  type principal = Principal;
  type nat = Nat;
  type nat64 = Nat64;

  type Tokens = {
    e8s : Nat64;
  };
  type text = Text;
  type tokens = { e8s : Nat64 };
  type TextAccountIdentifier = text;
  type AccountBalanceArgsDfx = { account : TextAccountIdentifier };

  type TransferArgs = {
    amount : Tokens;
    toPrincipal : Principal;
    toSubaccount : ?Blob;
  };

  type ProxyTransferArgs = {
    amount : Nat;
    toPrincipal : Text;
    fromPrincipal : Text;
  };

  type Account = {
    owner : principal;
    subaccount : ?blob;
  };
  public type ApproveArgs = {
    fee : ?Nat;
    memo : ?Blob;
    from_subaccount : ?Blob;
    created_at_time : ?Nat64;
    amount : Nat;
    expected_allowance : ?Nat;
    expires_at : ?Nat64;
    spender : Account;
  };

  //查询ICP余额
  public shared func queryICP(accountId : Text) : async tokens {
    let reqParam : AccountBalanceArgsDfx = { account = accountId };
    return await icp_ledger_canister_holder.account_balance_dfx(reqParam);
  };

  //查询当前用户
  public shared ({ caller }) func whoami() : async Principal {
    return caller;
  };

  //代理转账
  public shared ({ caller }) func proxy_transfer(param : ProxyTransferArgs) : async Result.Result<Nat,Text> {

    let args = {
      to = { owner = Principal.fromText(param.toPrincipal); subaccount = null };
      fee = null;
      spender_subaccount = null;
      from = { owner = Principal.fromText(param.fromPrincipal); subaccount = null };
      memo = null;
      created_at_time = null;
      amount = param.amount;
    };

    try {
      // initiate the transfer
      let transferResult = await icp_ledger_canister_holder.icrc2_transfer_from(args);

      // check if the transfer was successfull
      switch (transferResult) {
        case (#Err(transferError)) {
          return #err("Couldn't transfer funds:\n" # debug_show (transferError));
        };
        case (#Ok(blockIndex)) { return #ok blockIndex };
      };
    } catch (error : Error) {
      // catch any errors that might occur during the transfer
      return #err("Reject message: " # Error.message(error));
    };
    return #err("Couldn't transfer funds:\n 未知错误");
  };

  public shared ({ caller }) func transfer(args : TransferArgs) : async Result.Result<icp_ledger_canister.BlockIndex, Text> {
    Debug.print(
      "Transferring "
      # debug_show (args.amount)
      # " tokens to principal "
      # debug_show (args.toPrincipal)
      # " subaccount "
      # debug_show (args.toSubaccount)
    );

    let transferArgs : icp_ledger_canister.TransferArgs = {
      // can be used to distinguish between transactions
      memo = 0;
      // the amount we want to transfer
      amount = args.amount;
      // the ICP ledger charges 10_000 e8s for a transfer
      fee = { e8s = 10_000 };
      // we are transferring from the canisters default subaccount, therefore we don't need to specify it
      from_subaccount = null;
      // we take the principal and subaccount from the arguments and convert them into an account identifier
      // to = Blob.toArray(Principal.toLedgerAccount(args.toPrincipal, args.toSubaccount));
      to = Principal.toLedgerAccount(args.toPrincipal, args.toSubaccount);
      // a timestamp indicating when the transaction was created by the caller; if it is not specified by the caller then this is set to the current ICP time
      created_at_time = null;
    };

    try {
      // initiate the transfer
      let transferResult = await icp_ledger_canister_holder.transfer(transferArgs);

      // check if the transfer was successfull
      switch (transferResult) {
        case (#Err(transferError)) {
          return #err("Couldn't transfer funds:\n" # debug_show (transferError));
        };
        case (#Ok(blockIndex)) { return #ok blockIndex };
      };
    } catch (error : Error) {
      // catch any errors that might occur during the transfer
      return #err("Reject message: " # Error.message(error));
    };
  };
};
