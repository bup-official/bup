import React from 'react'
import { baseUrl } from '../utils/baseURL'

const CardPreviewIframe = ({ id }: { id: string }) => {
    return (
        <div className="bg-black w-[500px] h-[1000px] border border-slate-200">
            <iframe className='h-full w-full' src={`${baseUrl}/bup/${id}`} frameBorder="0"></iframe>
        </div>
    )
}

export default CardPreviewIframe