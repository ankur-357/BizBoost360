
function CardList({title,info,sale}) {
    return (
        <div className={sale ? "EUA__total__list":'EUA__info__list'}>
            <dt>{title}:</dt>
            <dd><strong>{info}</strong></dd>
        </div>
    );
}

export default CardList;