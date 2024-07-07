import React, { forwardRef } from 'react';
import { FormattedMessage } from "react-intl";
import Image from 'next/image';
interface PrintOrderDetailsProps {
    data: any;
    qrCodeImageUrl?: string;
}
const PrintOrderDetails = forwardRef<HTMLDivElement, PrintOrderDetailsProps>((props, ref) => {
    const { data, qrCodeImageUrl } = props;
    return (
        <div ref={ref} className="p-4">
            <div className="flex place-items-center justify-center -mt-10">
                <Image
                    src="/Logo_horizontal.png"
                    alt={`Logo`}
                    width={10000}
                    height={10000}
                    className='rounded-md object-contain h-52 w-80'
                />
            </div>
            <h1 className="text-3xl font-bold mb-4 text-center -mt-10 px-10"><FormattedMessage id="Print.Title" /></h1>
            <div className="flex place-items-center mb-4 justify-center">
                {qrCodeImageUrl && <Image
                    src={qrCodeImageUrl}
                    alt={`Qrcode`}
                    width={10000}
                    height={10000}
                    className='rounded-md object-contain h-60 w-60'
                />}
            </div>
            <div className='text-lg px-10'>
                <div className="mb-2">
                    <span className="font-bold"><FormattedMessage id="Mission.Detail.Info1" />:</span>
                    <span className="pl-2">{data.orderId}</span>
                </div>
                <div className="mb-2">
                    <span className="font-bold"><FormattedMessage id="Mission.Detail.Info9" />:</span>
                    <span className="pl-2">{data.nameSender}</span>
                </div>
                <div className="mb-2">
                    <span className="font-bold"><FormattedMessage id="Mission.Detail.Info3" />:</span>
                    <span className="pl-2">{`${data.detailSource??"Null"}, ${data.wardSource}, ${data.districtSource}, ${data.provinceSource}`}</span>
                </div>
                <div className="mb-2">
                    <span className="font-bold"><FormattedMessage id="Mission.Detail.Info10" />:</span>
                    <span className="pl-2">{data.phoneNumberSender}</span>
                </div>
                <div className="mb-2">
                    <span className="font-bold"><FormattedMessage id="Mission.Detail.Info11" />:</span>
                    <span className="pl-2">{data.nameReceiver}</span>
                </div>
                <div className="mb-2">
                    <span className="font-bold"><FormattedMessage id="Mission.Detail.Info3" />:</span>
                    <span className="pl-2">{`${data.detailDest}, ${data.wardDest}, ${data.districtDest}, ${data.provinceDest}`}</span>
                </div>
                <div className="mb-2">
                    <span className="font-bold"><FormattedMessage id="Mission.Detail.Info12" />:</span>
                    <span className="pl-2">{data.phoneNumberReceiver}</span>
                </div>
                <div className="mb-2">
                    <span className="font-bold"><FormattedMessage id="Mission.Detail.Info13" />:</span>
                    <span className="pl-2">{parseFloat(data.fee).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                </div>
                <div className="mb-2">
                    <span className="font-bold"><FormattedMessage id="Mission.Detail.Info4" />:</span>
                    <span className="pl-2">{parseFloat(data.COD).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                </div>
                <div className="mb-2">
                    <span className="font-bold"><FormattedMessage id="Mission.Detail.Info5" />:</span>
                    <span className="pl-2">{data.mass}</span>
                </div>
                <div className="mb-2">
                    <span className="font-bold"><FormattedMessage id="Mission.Detail.Info6" />:</span>
                    <span className="pl-2">{data.length}</span>
                </div>
                <div className="mb-2">
                    <span className="font-bold"><FormattedMessage id="Mission.Detail.Info7" />:</span>
                    <span className="pl-2">{data.width}</span>
                </div>
                <div className="mb-2">
                    <span className="font-bold"><FormattedMessage id="Mission.Detail.Info8" />:</span>
                    <span className="pl-2">{data.height}</span>
                </div>
            </div>
            <h2 className="text-xl font-bold mb-4 text-center px-4 mt-4">Cảm ơn quý khách & hẹn gặp lại</h2>
        </div>
    );
});

export default PrintOrderDetails;
