import React, { useRef, useEffect, useState, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FormattedMessage, useIntl } from "react-intl";
import DetailPopup from "@/components/popup";
// import { OrdersOperation } from "@/TDLib/tdlogistics";
import { OrdersOperation, GettingOrderImageParams, UpdatingOrderImageParams } from "@/TDLib/libv2";
// import { UpdatingOrderImageCondition } from "@/TDLib/tdlogistcs";
import { Button } from "@nextui-org/react";
import { CarouselSlider } from "@/components/slider";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
import { PassDataContext } from "@/providers/PassedData";


interface DetailOrderProps {
    onClose: () => void;
    dataInitial: any;
}

const DetailOrder: React.FC<DetailOrderProps> = ({ onClose, dataInitial }) => {
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [imageUrls2, setImageUrls2] = useState<string[]>([]);
    const ordersOperation = new OrdersOperation();
    const [option, setOption] = useState<null | number>(0);
    const intl = useIntl()

    console.log("initial",dataInitial);
    console.log("orderId",dataInitial.orderId);

    useEffect(() => {
        console.log("useEffect")
        function toUrl(images: Uint8Array[]): string[] {
            return images.map(image => {
                const blob = new Blob([image], { type: 'image/jpeg' }); // Adjust MIME type if necessary
                return URL.createObjectURL(blob);
            });
        };
        const fetchData = async () => {
            try {
                const sendSignatureCondition: GettingOrderImageParams = {
                    orderId: dataInitial.orderId,
                    type: "send"
                };
                const receiveSignatureCondition: UpdatingOrderImageParams = {
                    orderId: dataInitial.orderId,
                    taskId: dataInitial.id,
                    type: "receive"
                };
        
                // Fetch send and receive signature URLs
                const sendSignatureUrl = await ordersOperation.getSignature(sendSignatureCondition);
                const receiveSignatureUrl = await ordersOperation.getSignature(receiveSignatureCondition);
        
                // Fetch send images
                const sendImagesCondition: UpdatingOrderImageParams = {
                    orderId: dataInitial.orderId,
                    taskId: dataInitial.id,
                    type: "send"
                };
                const images = await ordersOperation.getImages(sendImagesCondition);
                const urls = toUrl(images.data || []);
                setImageUrls(urls);
        
                // Fetch receive images
                const receiveImagesCondition: UpdatingOrderImageParams = {
                    orderId: dataInitial.orderId,
                    taskId: dataInitial.id,
                    type: "receive"
                };
                const images2 = await ordersOperation.getImages(receiveImagesCondition);
                console.log("images2",images2);
                const urls2 = toUrl(images2.data || []);
                console.log("urls2",urls2);
                setImageUrls2(urls2);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    if (!dataInitial) {
        return <div>Error: dataInitial is undefined or null.</div>;
    }

    return (
        <DetailPopup children={
            <div className="flex flex-col md:flex-row">
                <div className="flex flex-col w-full md:w-1/2 px-2 md:pr-4 mb-4">
                    <div className="flex flex-col gap-1 place-items-center w-full justify-center ">
                        <Button className="flex items-center rounded-xl w-full bg-white p-2 border-2 border-gray-300 dark:bg-[#242526]" onClick={() => setOption(0)}>
                            {option === 0 ? <MdRadioButtonChecked /> : <MdRadioButtonUnchecked />}
                            <span className="pl-1 font-bold text-base w-40 font-sans"><FormattedMessage id="Mission.AddImage.Button1" /></span>
                        </Button>
                        <Button className="flex items-center rounded-xl w-full bg-white p-2 border-2 border-gray-300 dark:bg-[#242526]" onClick={() => setOption(1)}>
                            {option === 1 ? <MdRadioButtonChecked /> : <MdRadioButtonUnchecked />}
                            <span className="pl-1 font-bold text-base w-40 font-sans"><FormattedMessage id="Mission.AddImage.Button2" /></span>
                        </Button>
                    </div>
                    {imageUrls && option === 0 && <div className="relative"><CarouselSlider ObjUrls={imageUrls} /></div>}
                    {imageUrls2 && option === 1 && <div className="relative"><CarouselSlider ObjUrls={imageUrls2} /></div>}
                </div>
                <div className="flex flex-row gap-3 text-[#000000] dark:text-white md:w-1/2">
                    <div className="w-50 h-full flex-col">
                        <p className="whitespace-nowrap flex flex-row justify-between gap-2">
                            <span className="font-semibold"><FormattedMessage id="Mission.Detail.Info1" /></span>
                            <span className="font-semibold">:</span>
                        </p>
                        <p className="whitespace-nowrap flex flex-row justify-between gap-2">
                            <span className="font-semibold"><FormattedMessage id="Mission.Detail.Info9" /></span>
                            <span className="font-semibold">:</span>
                        </p>
                        <p className="whitespace-nowrap flex flex-row justify-between gap-2">
                            <span className="font-semibold"><FormattedMessage id="Mission.Detail.Info15" /></span>
                            <span className="font-semibold">:</span>
                        </p>
                        <p className="whitespace-nowrap flex flex-row justify-between gap-2">
                            <span className="font-semibold"><FormattedMessage id="Mission.Detail.Info10" /></span>
                            <span className="font-semibold">:</span>
                        </p>
                        <p className="whitespace-nowrap flex flex-row justify-between gap-2">
                            <span className="font-semibold"><FormattedMessage id="Mission.Detail.Info11" /></span>
                            <span className="font-semibold">:</span>
                            {" "}
                        </p>
                        <p className="whitespace-nowrap flex flex-row justify-between gap-2">
                            <span className="font-semibold"><FormattedMessage id="Mission.Detail.Info16" /></span>
                            <span className="font-semibold">:</span>
                        </p>
                        <p className="whitespace-nowrap flex flex-row justify-between gap-2">
                            <span className="font-semibold"><FormattedMessage id="Mission.Detail.Info12" /></span>
                            <span className="font-semibold">:</span>
                        </p>
                        <p className="whitespace-nowrap flex flex-row justify-between gap-2">
                            <span className="font-semibold"><FormattedMessage id="Mission.Detail.Info13" /></span>
                            <span className="font-semibold">:</span>
                        </p>
                        <p className="whitespace-nowrap flex flex-row justify-between">
                            <span className="font-semibold"><FormattedMessage id="Mission.Detail.Info4" /></span>
                            <span className="font-semibold">:</span>
                        </p>
                        <p className="whitespace-nowrap flex flex-row justify-between">
                            <span className="font-semibold"><FormattedMessage id="Mission.Detail.Info5" /></span>
                            <span className="font-semibold">:</span>
                        </p>
                        <p className="whitespace-nowrap flex flex-row justify-between">
                            <span className="font-semibold"><FormattedMessage id="Mission.Detail.Info6" /></span>
                            <span className="font-semibold">:</span>
                        </p>
                        <p className="whitespace-nowrap flex flex-row justify-between">
                            <span className="font-semibold"><FormattedMessage id="Mission.Detail.Info7" /></span>
                            <span className="font-semibold">:</span>
                        </p>
                        <p className="whitespace-nowrap flex flex-row justify-between">
                            <span className="font-semibold"><FormattedMessage id="Mission.Detail.Info8" /></span>
                            <span className="font-semibold">:</span>
                        </p>
                    </div>
                    <div className="w-full h-full flex-col">
                        <p className="whitespace-nowrap flex flex-row gap-2">
                            {dataInitial.orderId || intl.formatMessage({ id: "Mission.Detail.Info17" })}
                        </p>
                        <p className="whitespace-nowrap flex flex-row gap-2">
                            {dataInitial.nameSender || intl.formatMessage({ id: "Mission.Detail.Info17" })}
                        </p>
                        <p className="whitespace-nowrap flex flex-row gap-2">
                            {`${dataInitial.detailSource}, ${dataInitial.wardSource}, ${dataInitial.districtSource}, ${dataInitial.provinceSource}`}
                        </p>
                        <p className="whitespace-nowrap flex flex-row gap-2">
                            {dataInitial.phoneNumberSender || intl.formatMessage({ id: "Mission.Detail.Info17" })}
                        </p>
                        <p className="whitespace-nowrap flex flex-row gap-2">
                            {dataInitial.nameReceiver || intl.formatMessage({ id: "Mission.Detail.Info17" })}
                        </p>
                        <p className="whitespace-nowrap flex flex-row gap-2">
                            {`${dataInitial.detailDest}, ${dataInitial.wardDest}, ${dataInitial.districtDest}, ${dataInitial.provinceDest}`}
                        </p>
                        <p className="whitespace-nowrap flex flex-row gap-2">
                            {dataInitial.phoneNumberReceiver || intl.formatMessage({ id: "Mission.Detail.Info17" })}
                        </p>
                        <p className="whitespace-nowrap flex flex-row gap-2">
                            {parseFloat(dataInitial.fee).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) || intl.formatMessage({ id: "Mission.Detail.Info17" })}
                        </p>
                        <p className="whitespace-nowrap flex flex-row gap-2">
                            {parseFloat(dataInitial.cod).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) || intl.formatMessage({ id: "Mission.Detail.Info17" })}
                        </p>
                        <p className="whitespace-nowrap flex flex-row gap-2">
                            {dataInitial.mass || intl.formatMessage({ id: "Mission.Detail.Info17" })}
                        </p>
                        <p className="whitespace-nowrap flex flex-row gap-2">
                            {dataInitial.length || intl.formatMessage({ id: "Mission.Detail.Info17" })}
                        </p>
                        <p className="whitespace-nowrap flex flex-row gap-2">
                            {dataInitial.width || intl.formatMessage({ id: "Mission.Detail.Info17" })}
                        </p>
                        <p className="whitespace-nowrap flex flex-row gap-2">
                            {dataInitial.height || intl.formatMessage({ id: "Mission.Detail.Info17" })}
                        </p>
                    </div>
                </div>
            </div>} onClose={onClose} title={intl.formatMessage({ id: "Mission.Detail.Info18" })} />

    );
};

export default DetailOrder;