import './index.css'

const PriceDisplay = ({amount, digits = 2, currency = '$', cls = null}) => {
    const fixed = Number(amount).toFixed(digits);
    const [intPart, decimalPart] = fixed.split('.');
    const formattedInt = Number(intPart).toLocaleString('en-US');

    if (isNaN(amount))
        return null;

    return (
        <div className="price-box">
            <span className={cls ? 'curr' : "currency"}>{currency}</span>
            <span className={cls || 'int-part'}>{formattedInt}</span>
            {digits > 0 && <span className={cls || 'decimal-part'}>.{decimalPart}</span>}
        </div>
    );
};

export default PriceDisplay
