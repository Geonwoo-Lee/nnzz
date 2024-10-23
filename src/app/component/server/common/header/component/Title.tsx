

const Title = ({title, color}: {title: string, color?: string}) => {
    return (
        <p className={`text-title2 font-bold border-none ${color ? color : "text-alpha-900"}`}>
            {title}
        </p>
    )
}

export default Title