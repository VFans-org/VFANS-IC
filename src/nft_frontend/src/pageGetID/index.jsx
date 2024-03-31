import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { nft_backend, createActor } from 'declarations/nft_backend';
import { AuthClient } from "@dfinity/auth-client"
import { HttpAgent } from "@dfinity/agent";
import { AccountIdentifier } from "@dfinity/ledger-icp";
import { NavBar } from '@nutui/nutui-react'
import { ArrowLeft } from '@nutui/icons-react'
import queryString from 'query-string';

import './index.css';

function Page() {
    let navigate = useNavigate()
    let localtion = useLocation()
    const params = queryString.parse(location.search); 

    const onCreateTest = () => {
        console.log(params, 'aa')
        params.id = 'aaa';
        console.log(queryString.stringify(params),'bb',localtion);
    }

    async function onCreate(event) {
        event.preventDefault();

        // create an auth client
        let authClient = await AuthClient.create();
        // start the login process and wait for it to finish
        await new Promise((resolve) => {
            authClient.login({
                identityProvider: 'https://identity.ic0.app/',
                onSuccess: resolve,
            });
        });

        // At this point we're authenticated, and we can get the identity from the auth client:
        const identity = authClient.getIdentity();
        // Using the identity obtained from the auth client, we can create an agent to interact with the IC.
        const agent = new HttpAgent({ identity });
        const actor = createActor('bkyz2-fmaaa-aaaaa-qaaaq-cai', {
            agent,
        });
        // Using the interface description of our webapp, we create an actor that we use to call the service methods.
        const principal = await actor.whoami();
        const textDecoder = new TextDecoder();
        const accountIdentifier = AccountIdentifier.fromPrincipal({ principal: principal })
        // alert(accountIdentifier.toHex());
        console.log(accountIdentifier.toHex());

        params.id = accountIdentifier.toHex();
        console.log(queryString.stringify(params),'bb');
        // 页面跳转方法
        navigate('/pageShowIdentity?'+queryString.stringify(params));
        return false;

    }

    return (
        <div className='page-getid'>
            <NavBar
                back={<ArrowLeft color="rgba(0, 0, 0, 0.85)" />}
                onBackClick={() => router.back()}
            ></NavBar>
            <div className='content'>
                <div className='block-box'>
                    <div className='block'>
                        <div className='block-title'>
                            说明：
                        </div>
                        <div className='block-txt'>
                            1、该链上ID来源于 Internet Identity，更多链开发中，敬请期待
                        </div>
                        <div className='block-txt'>
                            2、链上ID成功获取后，将进入NFT自动铸造流程，稍后可重新进入页面查看
                        </div>
                    </div>
                </div>
                <div className='link-box'>
                    <Link className='link' to='http://www.baidu.com'>
                        <span className='link'>点击查看创建教程</span>
                    </Link>

                </div>
                <div className='btn-box'>
                    <span onClick={onCreate} className='btn'>去创建</span>
                </div>
                {/* <div className='btn-box'>
                    <span onClick={onCreateTest} className='btn'>测试</span>
                </div> */}
            </div>
        </div>
    );
}

export default Page;
