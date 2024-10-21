import * as React from "react";

interface IProps {
    value: number;
    onChange: (newValue: number) => void;
}

const MyRatingComponent: React.FC<IProps> = ({ value, onChange }) => {
    const [hoverValue, setHoverValue] = React.useState<number | null>(null);

    const handleClick = (rating: number) => {
        onChange(rating);
    };

    return (
        <div style={{ display: 'flex' }}>
            {[1, 2, 3, 4, 5].map(star => (
                <span
                    key={star}
                    onMouseEnter={() => setHoverValue(star)}
                    onMouseLeave={() => setHoverValue(null)}
                    onClick={() => handleClick(star)}
                    style={{
                        cursor: 'pointer',
                        fontSize: '24px',
                        color: (hoverValue || value) >= star ? 'gold' : 'gray',
                    }}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

export default MyRatingComponent;
