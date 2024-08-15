const BGCover = ({url}: {url: string}): JSX.Element => {
    return (
        <div className={`bg-cover bg-[url('${url}')] w-24 h-24`} />
    )
}

export default BGCover;