import { useState } from 'react';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom'
import { nft_backend, createActor } from 'declarations/nft_backend';
import { AuthClient } from "@dfinity/auth-client"
import { HttpAgent } from "@dfinity/agent";
import { AccountIdentifier } from "@dfinity/ledger-icp";

function App() {
  const [greeting, setGreeting] = useState('');
  let navigate = useNavigate()
  // /* 手写实现获取到url中？后的参数信息 */
  let localtion = useLocation()
  let params = useParams()


  async function handleSubmit(event) {
    event.preventDefault();

    // create an auth client
    let authClient = await AuthClient.create();
    // start the login process and wait for it to finish
    await new Promise((resolve) => {
      authClient.login({
        identityProvider: 'https://identity.ic0.app',
        onSuccess: resolve,
      });
    });

    // At this point we're authenticated, and we can get the identity from the auth client:
    const identity = authClient.getIdentity();
    // Using the identity obtained from the auth client, we can create an agent to interact with the IC.
    const agent = new HttpAgent({ identity });
    const actor = createActor('zfeoc-xaaaa-aaaal-ai4nq-cai', {
      agent,
    });
    // Using the interface description of our webapp, we create an actor that we use to call the service methods.
    const principal = await actor.whoami();
    const textDecoder = new TextDecoder();
    const accountIdentifier = AccountIdentifier.fromPrincipal({ principal: principal })
    alert(accountIdentifier.toHex());

    const name = event.target.elements.name.value;
    nft_backend.greet(name).then((greeting) => {
      setGreeting(greeting);
    });

    console.log(localtion, params, "--------------");
    // 页面跳转方法
    // navigate('/tab1');
    return false;

  }
  //queryNfts

  const onQueryNfts = () => {
    nft_backend.queryNfts('f6d30373bf6a2ec170019a71c001891e8aaa43039fbb92c3ace42d4bfece3997').then((data) => {
     console.log(data)
    });
  }

 

  return (
    <main>
      <div onClick={onQueryNfts}>
      queryNfts
      </div>
      <br />
      <br />
      <form action="#" onSubmit={handleSubmit}>
        <label htmlFor="name">new Enter your name: &nbsp;</label>
        <input id="name" alt="Name" type="text" />
        <button type="submit">Click Me!</button>
      </form>
      <section id="greeting">{greeting}</section>
    </main>
  );
}

export default App;
