import React from 'react'
import { GetVCardType } from '../server/router/vcard.router';

const VCard: React.FC<{
    v: GetVCardType
}> = ({ v }) => {

    const generateVCard = (v: GetVCardType) => {
        let vCardsJS = require("vcards-js");
        let vCardSample = vCardsJS();
        vCardSample.firstName = [v?.firstName];
        vCardSample.lastName = [v?.lastName];
        vCardSample.workPhone = [v?.phoneNumber];
        vCardSample.email = [v?.emailAddress];
        vCardSample.title = "Business";
        vCardSample.url = [v?.url];
        vCardSample.note = [v?.note];

        const FileSaver = require("file-saver");
        const blob = new Blob([vCardSample.getFormattedString()], {
            type: "text/vcard;charset=utf-8"
        });

        FileSaver.saveAs(blob, `${v?.firstName}.vcf`);
        return vCardSample;
    }



    return (
        <>
            {
                v && (
                    <a className='cursor-pointer border-b border-b-slate-100 my-2' onClick={() => generateVCard(v)}>{v?.vCardTitle}</a>

                )
            }

        </>
    )
}

export default VCard