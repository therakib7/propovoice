const Label = ( props ) => { 
    const show = () => {
        document.getElementById('pi-pro-alert').style.display = 'block';
    };

    return (
        <span className="pi-pro-label" onClick={() => show()} style={{background: ( props.blueBtn ) ? '#FFEED9' : 'auto'}}>
            <svg
                width={13}
                height={10}
                viewBox="0 0 13 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M1.71013 8.87452C1.72412 8.93204 1.7495 8.98616 1.78477 9.0337C1.82003 9.08124 1.86447 9.12123 1.91545 9.15131C1.96643 9.18139 2.02292 9.20094 2.08158 9.20882C2.14025 9.2167 2.19989 9.21274 2.257 9.19718C4.86395 8.47534 7.61803 8.47534 10.225 9.19718C10.2821 9.21274 10.3417 9.2167 10.4004 9.20882C10.4591 9.20094 10.5156 9.18139 10.5665 9.15131C10.6175 9.12123 10.6619 9.08124 10.6972 9.0337C10.7325 8.98616 10.7579 8.93204 10.7718 8.87452L12.1664 2.95187C12.1855 2.87259 12.1821 2.78954 12.1566 2.71209C12.131 2.63464 12.0843 2.56588 12.0218 2.51356C11.9592 2.46123 11.8833 2.42744 11.8025 2.41599C11.7218 2.40454 11.6395 2.41588 11.5648 2.44874L8.79763 3.67921C8.69737 3.72336 8.5843 3.72879 8.48027 3.69445C8.37624 3.6601 8.28863 3.58843 8.23435 3.49327L6.62653 0.594837C6.5887 0.526455 6.53324 0.469456 6.46592 0.429765C6.3986 0.390074 6.32187 0.369141 6.24372 0.369141C6.16557 0.369141 6.08885 0.390074 6.02153 0.429765C5.95421 0.469456 5.89874 0.526455 5.86091 0.594837L4.2531 3.49327C4.19882 3.58843 4.1112 3.6601 4.00717 3.69445C3.90314 3.72879 3.79008 3.72336 3.68982 3.67921L0.922629 2.44874C0.847988 2.41588 0.765648 2.40454 0.684901 2.41599C0.604154 2.42744 0.528216 2.46123 0.465658 2.51356C0.403099 2.56588 0.35641 2.63464 0.330861 2.71209C0.305312 2.78954 0.301919 2.87259 0.321067 2.95187L1.71013 8.87452Z"
                    fill="#FF6B00"
                />
            </svg>
            Pro
        </span>

    );
};

export default Label; 