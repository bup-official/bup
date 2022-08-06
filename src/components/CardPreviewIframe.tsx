import React from 'react'

const CardPreviewIframe = ({ id }: { id: string }) => {
    return (
        <div className="bg-black w-[500px] h-[1000px] border border-slate-200">
            <iframe className='h-full w-full' src={`http://localhost:3000/bup/${id}`} frameBorder="0"></iframe>
        </div>
    )
}

export default CardPreviewIframe