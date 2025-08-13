import * as React from "react"

const XagUsd = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 48 48"
        {...props}
    >
        <defs>
            <linearGradient
                id="linear-gradient"
                x1={37.25}
                y1={34.26}
                x2={37.25}
                y2={45.15}
                gradientUnits="userSpaceOnUse"
            >
                <stop offset={0} stopColor="#fff"/>
                <stop offset={1} stopColor="#999"/>
            </linearGradient>
            <linearGradient
                id="linear-gradient-3"
                x1={24.13}
                y1={16.83}
                x2={24.13}
                y2={33.79}
                gradientUnits="userSpaceOnUse"
            >
                <stop offset={0} stopColor="#fff"/>
                <stop offset={1}/>
            </linearGradient>
            <mask
                id="mask"
                x={28}
                y={32}
                width={19}
                height={16}
                maskUnits="userSpaceOnUse"
            >
                <image
                    width={19}
                    height={16}
                    transform="translate(28 32)"
                    xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAQCAYAAAD0xERiAAAACXBIWXMAAAsSAAALEgHS3X78AAABTElEQVQ4T62Uy46rMBBEj91+hYCUTf7/GyPFiQE/ZjHCIWLuHUWaklhguU612w0KaPyR9G8bPpE5LBiDMd/LOWdyzgfTv3SAOecYxxGlFDFG7vf7T74fdYB57xmGAa01WmtyzqSUALDWIiJ9b2uNnDOllCMshMD5fCaE0E3P55OUEtZahmFARGitvQVtsLcL8N7jnMNaizEG5xze+x7kvUdEqLWitcYYg9YvxFtlIoJSCgClFMYYpmlCKdUrjTFyu92Ypglr7d7+gm39KKWQUkJEet9CCNRa+/G2sO05wADWdSXGCIDWuieXUsg5Y63ldDpxvV4xxlBr3dtfsForj8eD1hrrugL0HpVSmOeZy+XCOI6EEGit9WoPsFJKv5VN8zy/vW9DvA/YD/Vhzv6nnHMPWJaFZVn6KQAUH3zoItLnbA/Z9BHsN/3pX+MLqWadN8pdo0cAAAAASUVORK5CYII="
                    className="cls-12"
                />
            </mask>
            <mask
                id="mask-2"
                x={3}
                y={9}
                width={42}
                height={30}
                maskUnits="userSpaceOnUse"
            >
                <image
                    width={42}
                    height={30}
                    transform="translate(3 9)"
                    xlinkHref="data:image/png;base64,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"
                    className="cls-12"
                />
            </mask>
            <filter
                id="luminosity-invert"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
            >
                <feColorMatrix values="-1 0 0 0 1 0 -1 0 0 1 0 0 -1 0 1 0 0 0 1 0"/>
            </filter>
            <style>
                {
                    ".cls-3{mix-blend-mode:multiply}.cls-4{fill:url(#linear-gradient)}.cls-12{filter:url(#luminosity-invert)}"
                }
            </style>
        </defs>
        <g
            style={{
                isolation: "isolate",
            }}
        >
            <g id="Layer_1" data-name="Layer 1">
                <path
                    style={{
                        fill: "#e2e2e2",
                    }}
                    d="M0 0h48v48H0z"
                />
                <g className="cls-3">
                    <path
                        className="cls-4"
                        d="m36 42.64-.36-1.19s0-.05-.06-.05h-3l-.06.05-.35 1.19a.16.16 0 0 1-.16.12h-1.49a.12.12 0 0 1-.11 0s0-.07 0-.13L33 34.38a.15.15 0 0 1 .16-.12h1.9a.15.15 0 0 1 .16.12l2.62 8.21a.14.14 0 0 1 0 .06c0 .07-.05.11-.14.11h-1.5a.16.16 0 0 1-.2-.12Zm-3-2.56h2.13c.05 0 .07 0 .05-.08l-1.09-3.6L33 40s0 .08.06.08ZM42.44 36.56a.12.12 0 0 1 .1 0H44a.13.13 0 0 1 .1 0 .14.14 0 0 1 0 .1v5.54a2.64 2.64 0 0 1-.92 2.27 3.82 3.82 0 0 1-2.36.68 8.34 8.34 0 0 1-.95-.06c-.08 0-.12-.06-.12-.16l.05-1.25c0-.1 0-.15.17-.13a4.73 4.73 0 0 0 .8.07 1.82 1.82 0 0 0 1.23-.34 1.31 1.31 0 0 0 .42-1.09 1.73 1.73 0 0 1-1.35.5 2.91 2.91 0 0 1-1.45-.38 2.17 2.17 0 0 1-.94-1.23 4.84 4.84 0 0 1-.18-1.45 4.45 4.45 0 0 1 .22-1.54 2.41 2.41 0 0 1 .86-1.19 2.28 2.28 0 0 1 1.41-.45 1.82 1.82 0 0 1 1.43.56v-.3a.14.14 0 0 1 .02-.15Zm0 3v-.58a2.23 2.23 0 0 0-.09-.39 1.05 1.05 0 0 0-.36-.53 1.08 1.08 0 0 0-1.25 0 1.15 1.15 0 0 0-.38.53 2.4 2.4 0 0 0-.17 1 2.24 2.24 0 0 0 .15 1 1 1 0 0 0 1 .73 1 1 0 0 0 .64-.2 1 1 0 0 0 .36-.51 4.43 4.43 0 0 0 .05-1.02Z"
                    />
                </g>
                <g
                    style={{
                        mask: "url(#mask)",
                    }}
                >
                    <g
                        className="cls-3"
                        style={{
                            opacity: 0.6,
                        }}
                    >
                        <path
                            d="m36 42.64-.36-1.19s0-.05-.06-.05h-3l-.06.05-.35 1.19a.16.16 0 0 1-.16.12h-1.49a.12.12 0 0 1-.11 0s0-.07 0-.13L33 34.38a.15.15 0 0 1 .16-.12h1.9a.15.15 0 0 1 .16.12l2.62 8.21a.14.14 0 0 1 0 .06c0 .07-.05.11-.14.11h-1.5a.16.16 0 0 1-.2-.12Zm-3-2.56h2.13c.05 0 .07 0 .05-.08l-1.09-3.6L33 40s0 .08.06.08ZM42.44 36.56a.12.12 0 0 1 .1 0H44a.13.13 0 0 1 .1 0 .14.14 0 0 1 0 .1v5.54a2.64 2.64 0 0 1-.92 2.27 3.82 3.82 0 0 1-2.36.68 8.34 8.34 0 0 1-.95-.06c-.08 0-.12-.06-.12-.16l.05-1.25c0-.1 0-.15.17-.13a4.73 4.73 0 0 0 .8.07 1.82 1.82 0 0 0 1.23-.34 1.31 1.31 0 0 0 .42-1.09 1.73 1.73 0 0 1-1.35.5 2.91 2.91 0 0 1-1.45-.38 2.17 2.17 0 0 1-.94-1.23 4.84 4.84 0 0 1-.18-1.45 4.45 4.45 0 0 1 .22-1.54 2.41 2.41 0 0 1 .86-1.19 2.28 2.28 0 0 1 1.41-.45 1.82 1.82 0 0 1 1.43.56v-.3a.14.14 0 0 1 .02-.15Zm0 3v-.58a2.23 2.23 0 0 0-.09-.39 1.05 1.05 0 0 0-.36-.53 1.08 1.08 0 0 0-1.25 0 1.15 1.15 0 0 0-.38.53 2.4 2.4 0 0 0-.17 1 2.24 2.24 0 0 0 .15 1 1 1 0 0 0 1 .73 1 1 0 0 0 .64-.2 1 1 0 0 0 .36-.51 4.43 4.43 0 0 0 .05-1.02Z"/>
                    </g>
                </g>
                <path
                    d="M29.34 11 9.13 21.81l-3.19 8.52.56.3L18.41 37l23.9-12.73-2.92-7.77L29.34 11Zm9.22 7.38 1.95 5.15-7.95 4.23 5.16-8.93.84-.45Zm-6.94 3.68-5.17 9-3.23 1.72 5.59-9.19 2.81-1.48ZM10 23.67l2.19 1.16L8 29Zm16.31 1.23-5.58 9.17-1.33.71.45-6.48 6.44-3.41Zm-12.81.64 1.31.7-4.68 4.68-1.31-.7 4.68-4.68Zm4.92 2.64-.42 6.9-4.2-2.23Z"
                    style={{
                        fill: "#1a1a1a",
                    }}
                />
                <g
                    style={{
                        mask: "url(#mask-2)",
                    }}
                >
                    <path
                        d="M29.34 11 9.13 21.81l-3.19 8.52.56.3L18.41 37l23.9-12.73-2.92-7.77L29.34 11Zm9.22 7.38 1.95 5.15-7.95 4.23 5.16-8.93.84-.45Zm-6.94 3.68-5.17 9-3.23 1.72 5.59-9.19 2.81-1.48ZM10 23.67l2.19 1.16L8 29Zm16.31 1.23-5.58 9.17-1.33.71.45-6.48 6.44-3.41Zm-12.81.64 1.31.7-4.68 4.68-1.31-.7 4.68-4.68Zm4.92 2.64-.42 6.9-4.2-2.23Z"
                        style={{
                            opacity: 0.6,
                        }}
                    />
                </g>
                <g
                    style={{
                        opacity: 0.2,
                    }}
                >
                    <path
                        d="M29.34 11 9.13 21.81l-3.19 8.52.56.3L18.41 37l23.9-12.73-2.92-7.77L29.34 11Zm9.22 7.38 1.95 5.15-7.95 4.23 5.16-8.93.84-.45Zm-6.94 3.68-5.17 9-3.23 1.72 5.59-9.19 2.81-1.48ZM10 23.67l2.19 1.16L8 29Zm16.31 1.23-5.58 9.17-1.33.71.45-6.48 6.44-3.41Zm-12.81.64 1.31.7-4.68 4.68-1.31-.7 4.68-4.68Zm4.92 2.64-.42 6.9-4.2-2.23Z"
                        style={{
                            fill: "url(#linear-gradient-3)",
                        }}
                    />
                </g>
            </g>
        </g>
    </svg>
)

export default XagUsd
