import { useEffect, useState } from 'react';
import { Image,Toast } from '@nutui/nutui-react';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import imgfadian from './assets/fadian.png';
import imgkongtou from './assets/kongtou.png';
import imgleidian from './assets/leidian.png';
import imgshandian from './assets/shandian.png';
import vector from './assets/vector.svg';
import queryString from 'query-string';
import { nft_backend } from 'declarations/nft_backend';
import copy from 'copy-to-clipboard'
import './index.css';


function Page() {

    const [pageData, setPageData] = useState({});

    const data = [{
        key: '合约类型',
        value: 'sbt_membership_category'
    }, {
        key: '铸造时间',
        value: 'sbt_get_time'
    }, {
        key: '公链（Layer1/2）',
        value: 'sbt_card_number'
    }, {
        key: 'VFT数量更新时间',
        value: 'vft_update_time'
    }]

    useEffect(() => {
        const params = queryString.parse(location.search);
        nft_backend.queryNfts(params.id).then((data) => {
            console.log(data, '------')
            setPageData(JSON.parse(data));
        });

    }, [])

    const handleCopyClick = () => {
        try {
            if (pageData.ic_account_id) copy(pageData.ic_account_id)
            void Toast.show('已复制到剪贴板')
        } catch {
            void Toast.show({
                content: '复制失败',
                icon: 'fail',
            })
        }
    }

    return (
        <div className='container'>
            <div style={{
                backgroundImage: `url(${imgfadian})`
            }} className='image-bg'>
                <div className='image-btn'>
                    获取更多
                </div>
            </div>
            <div className='content'>
                <div className='input-label'>社区身份地址：</div>
                <div className='input-box'>
                    <div className='input-txt'>{pageData.ic_account_id || '铸造中，请稍后查看'}</div>
                    <div style={{
                        backgroundImage: `url(${vector})`
                    }} className='vector' onClick={handleCopyClick}></div>
                </div>
                <div className='row-box'>
                    {
                        data.map((item, index) => {
                            return (<div className='row'>
                                <div className='row-lable'>{item.key}： </div>
                                <div className='row-value'>{pageData[item.value] || '铸造中，请稍后查看'}</div>
                            </div>)
                        })
                    }
                </div>
                <div className='block'>
                    <div className='block-title'>社区身份作用：</div>
                    <div className='block-txt'>
                        无法复制或转让的凭证，但可以存取您VFT的变动信息，未来也会包含您在社区的投票权重（声誉值）
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;
