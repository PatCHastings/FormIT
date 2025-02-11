import React, { useState, useEffect } from "react";

const FormITsmall = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    return () => setAnimate(false);
  }, []);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: "scale(1.2)", // Doubles the size
        marginRight: "0.5rem",
      }}
      width="99"
      height="25"
      viewBox="0 0 99 25"
      fill="none"
    >
      <mask
        id="path-1-outside-1_2_2"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="99"
        height="25"
        fill="black"
      >
        <defs>
          <linearGradient
            id="secondaryGradient"
            x1="-200%" /* Start far left off-screen */
            y1="0%"
            x2="300%" /* End far right off-screen */
            y2="0%"
          >
            {/* Smooth color transitions */}
            <stop offset="0%" stopColor="#eea215" />
            <stop offset="25%" stopColor="#34e6dd" />
            <stop offset="50%" stopColor="#eea215" />
            <stop offset="75%" stopColor="#34e6dd" />
            <stop offset="100%" stopColor="#eea215" />

            {animate && (
              <animateTransform
                attributeName="gradientTransform"
                type="translate"
                from="-1 0"
                to="1 0"
                dur="7s"
                repeatCount="indefinite"
              />
            )}
          </linearGradient>
        </defs>

        <rect fill="url(#secondaryGradient)" width="99" height="25" />
        <path d="M2.48 1.272H13.456C14.2667 1.272 14.672 1.67733 14.672 2.488C14.672 3.27733 14.2667 3.672 13.456 3.672H4.016V10.52H12.208C12.9973 10.52 13.392 10.9253 13.392 11.736C13.392 12.5253 12.9973 12.92 12.208 12.92H4.016V21.816C4.016 22.6053 3.6 23 2.768 23H2.48C1.648 23 1.232 22.5947 1.232 21.784V2.488C1.232 1.67733 1.648 1.272 2.48 1.272ZM19.101 9.08C20.6157 7.65067 22.4717 6.936 24.669 6.936C26.8663 6.936 28.7223 7.65067 30.237 9.08C31.7517 10.5093 32.509 12.5253 32.509 15.128C32.509 17.7307 31.7517 19.736 30.237 21.144C28.7223 22.552 26.8663 23.256 24.669 23.256C22.4717 23.256 20.6157 22.552 19.101 21.144C17.5863 19.736 16.829 17.7307 16.829 15.128C16.829 12.5253 17.5863 10.5093 19.101 9.08ZM28.349 10.712C27.4103 9.66667 26.1837 9.144 24.669 9.144C23.1543 9.144 21.917 9.66667 20.957 10.712C20.0183 11.736 19.549 13.208 19.549 15.128C19.549 17.0267 20.0183 18.4987 20.957 19.544C21.917 20.568 23.1543 21.08 24.669 21.08C26.1837 21.08 27.4103 20.568 28.349 19.544C29.309 18.4987 29.789 17.0267 29.789 15.128C29.789 13.208 29.309 11.736 28.349 10.712ZM36.772 7.224H36.964C37.7747 7.224 38.18 7.61867 38.18 8.408V10.136C38.5427 9.32533 39.1187 8.6 39.908 7.96C40.7187 7.32 41.5827 7 42.5 7C43.4173 7 44.1107 7.18133 44.58 7.544C45.0707 7.90667 45.316 8.35467 45.316 8.888C45.316 9.4 45.092 9.80533 44.644 10.104C43.9827 9.54933 43.2787 9.272 42.532 9.272C41.2093 9.272 40.164 9.816 39.396 10.904C38.628 11.9707 38.244 13.3147 38.244 14.936V21.784C38.244 22.2107 38.148 22.52 37.956 22.712C37.764 22.904 37.4547 23 37.028 23H36.772C36.3453 23 36.036 22.904 35.844 22.712C35.652 22.52 35.556 22.2107 35.556 21.784V8.408C35.556 7.61867 35.9613 7.224 36.772 7.224ZM49.132 7.224H49.324C50.156 7.224 50.572 7.62933 50.572 8.44V9.784C51.5533 7.928 53.0573 7 55.084 7C56.3853 7 57.4627 7.352 58.316 8.056C59.1907 8.73867 59.788 9.69867 60.108 10.936C60.4493 9.69867 61.0787 8.728 61.996 8.024C62.9133 7.32 63.9693 6.968 65.164 6.968C68.8333 6.968 70.668 9.112 70.668 13.4V21.816C70.668 22.6053 70.2413 23 69.388 23H69.196C68.3853 23 67.98 22.6053 67.98 21.816V13.56C67.98 10.6373 66.8707 9.176 64.652 9.176C63.0947 9.176 62.028 9.74133 61.452 10.872C60.8973 12.0027 60.62 13.5387 60.62 15.48V21.816C60.62 22.6053 60.204 23 59.372 23H59.148C58.3373 23 57.932 22.6053 57.932 21.816V13.56C57.932 10.6373 56.812 9.176 54.572 9.176C51.9053 9.176 50.572 11.2453 50.572 15.384V21.816C50.572 22.6053 50.156 23 49.324 23H49.132C48.3213 23 47.916 22.6053 47.916 21.816V8.44C47.916 7.62933 48.3213 7.224 49.132 7.224ZM76.4818 1.272H76.7698C77.6231 1.272 78.0498 1.688 78.0498 2.52V21.784C78.0498 22.5947 77.6231 23 76.7698 23H76.4818C75.6711 23 75.2658 22.5947 75.2658 21.784V2.52C75.2658 1.688 75.6711 1.272 76.4818 1.272ZM82.9158 1.272H96.5478C97.3584 1.272 97.7638 1.67733 97.7638 2.488C97.7638 3.27733 97.3584 3.672 96.5478 3.672H91.1078V21.784C91.1078 22.5947 90.6918 23 89.8598 23H89.5718C88.7398 23 88.3238 22.5947 88.3238 21.784V3.672H82.9158C82.1051 3.672 81.6998 3.27733 81.6998 2.488C81.6998 1.67733 82.1051 1.272 82.9158 1.272Z" />
      </mask>
      <path
        d="M4.016 3.672V2.672H3.016V3.672H4.016ZM4.016 10.52H3.016V11.52H4.016V10.52ZM4.016 12.92V11.92H3.016V12.92H4.016ZM2.48 2.272H13.456V0.271999H2.48V2.272ZM13.456 2.272C13.7072 2.272 13.7119 2.33412 13.6609 2.28311C13.6099 2.23209 13.672 2.23681 13.672 2.488H15.672C15.672 1.92852 15.5315 1.32524 15.0751 0.868892C14.6188 0.412546 14.0155 0.271999 13.456 0.271999V2.272ZM13.672 2.488C13.672 2.60264 13.6569 2.66155 13.6499 2.68211C13.6446 2.69755 13.6477 2.68161 13.6704 2.65953C13.7222 2.60907 13.7138 2.672 13.456 2.672V4.672C14.0089 4.672 14.6085 4.53759 15.0656 4.09247C15.5277 3.64253 15.672 3.04368 15.672 2.488H13.672ZM13.456 2.672H4.016V4.672H13.456V2.672ZM3.016 3.672V10.52H5.016V3.672H3.016ZM4.016 11.52H12.208V9.52H4.016V11.52ZM12.208 11.52C12.3226 11.52 12.3815 11.5351 12.4021 11.5421C12.4175 11.5474 12.4016 11.5443 12.3795 11.5216C12.3291 11.4698 12.392 11.4782 12.392 11.736H14.392C14.392 11.1831 14.2576 10.5835 13.8125 10.1264C13.3625 9.66428 12.7637 9.52 12.208 9.52V11.52ZM12.392 11.736C12.392 11.853 12.377 11.9146 12.3693 11.9378C12.3632 11.9561 12.3654 11.9404 12.3889 11.9169C12.4124 11.8934 12.4281 11.8912 12.4098 11.8973C12.3866 11.905 12.325 11.92 12.208 11.92V13.92C12.7568 13.92 13.3521 13.7821 13.8031 13.3311C14.2541 12.8801 14.392 12.2848 14.392 11.736H12.392ZM12.208 11.92H4.016V13.92H12.208V11.92ZM3.016 12.92V21.816H5.016V12.92H3.016ZM3.016 21.816C3.016 21.9283 3.00088 21.9845 2.99454 22.0025C2.99009 22.0152 2.99405 21.9991 3.01574 21.9785C3.06276 21.9339 3.04261 22 2.768 22V24C3.32539 24 3.92924 23.8687 4.39226 23.4295C4.86514 22.9808 5.016 22.3786 5.016 21.816H3.016ZM2.768 22H2.48V24H2.768V22ZM2.48 22C2.21172 22 2.1954 21.9345 2.24186 21.9798C2.29315 22.0297 2.232 22.0285 2.232 21.784H0.232C0.232 22.3502 0.378851 22.9569 0.846135 23.4122C1.3086 23.8628 1.91628 24 2.48 24V22ZM2.232 21.784V2.488H0.232V21.784H2.232ZM2.232 2.488C2.232 2.2435 2.29315 2.24226 2.24186 2.29223C2.1954 2.33751 2.21172 2.272 2.48 2.272V0.271999C1.91628 0.271999 1.3086 0.409159 0.846135 0.85977C0.378851 1.31507 0.232 1.92184 0.232 2.488H2.232ZM19.101 9.08L18.4147 8.3527L18.4147 8.3527L19.101 9.08ZM30.237 9.08L30.9233 8.3527L30.9233 8.3527L30.237 9.08ZM30.237 21.144L30.9178 21.8764L30.9178 21.8764L30.237 21.144ZM19.101 21.144L18.4202 21.8764L18.4202 21.8764L19.101 21.144ZM28.349 10.712L27.605 11.3801L27.6121 11.3881L27.6195 11.3959L28.349 10.712ZM20.957 10.712L20.2205 10.0356L20.2198 10.0363L20.957 10.712ZM20.957 19.544L20.213 20.2121L20.2201 20.2201L20.2275 20.2279L20.957 19.544ZM28.349 19.544L27.6125 18.8676L27.6118 18.8683L28.349 19.544ZM19.7873 9.8073C21.1054 8.56345 22.7114 7.936 24.669 7.936V5.936C22.232 5.936 20.1259 6.73788 18.4147 8.3527L19.7873 9.8073ZM24.669 7.936C26.6266 7.936 28.2326 8.56345 29.5507 9.8073L30.9233 8.3527C29.2121 6.73788 27.106 5.936 24.669 5.936V7.936ZM29.5507 9.8073C30.8174 11.0027 31.509 12.7273 31.509 15.128H33.509C33.509 12.3233 32.6859 10.016 30.9233 8.3527L29.5507 9.8073ZM31.509 15.128C31.509 17.5294 30.8173 19.2393 29.5562 20.4116L30.9178 21.8764C32.6861 20.2327 33.509 17.9319 33.509 15.128H31.509ZM29.5562 20.4116C28.2388 21.6361 26.6311 22.256 24.669 22.256V24.256C27.1016 24.256 29.2059 23.4679 30.9178 21.8764L29.5562 20.4116ZM24.669 22.256C22.7069 22.256 21.0992 21.6361 19.7818 20.4116L18.4202 21.8764C20.1321 23.4679 22.2364 24.256 24.669 24.256V22.256ZM19.7818 20.4116C18.5207 19.2393 17.829 17.5294 17.829 15.128H15.829C15.829 17.9319 16.6519 20.2327 18.4202 21.8764L19.7818 20.4116ZM17.829 15.128C17.829 12.7273 18.5206 11.0027 19.7873 9.8073L18.4147 8.3527C16.6521 10.016 15.829 12.3233 15.829 15.128H17.829ZM29.093 10.0439C27.9487 8.76945 26.4426 8.144 24.669 8.144V10.144C25.9247 10.144 26.872 10.5639 27.605 11.3801L29.093 10.0439ZM24.669 8.144C22.8955 8.144 21.3837 8.76897 20.2205 10.0356L21.6935 11.3884C22.4503 10.5644 23.4132 10.144 24.669 10.144V8.144ZM20.2198 10.0363C19.0567 11.3051 18.549 13.0541 18.549 15.128H20.549C20.549 13.3619 20.9799 12.1669 21.6942 11.3877L20.2198 10.0363ZM18.549 15.128C18.549 17.1856 19.059 18.9271 20.213 20.2121L21.701 18.8759C20.9776 18.0703 20.549 16.8677 20.549 15.128H18.549ZM20.2275 20.2279C21.3926 21.4707 22.9023 22.08 24.669 22.08V20.08C23.4063 20.08 22.4414 19.6653 21.6865 18.8601L20.2275 20.2279ZM24.669 22.08C26.4357 22.08 27.9398 21.4703 29.0862 20.2197L27.6118 18.8683C26.8809 19.6657 25.9317 20.08 24.669 20.08V22.08ZM29.0855 20.2204C30.2654 18.9356 30.789 17.191 30.789 15.128H28.789C28.789 16.8624 28.3526 18.0617 27.6125 18.8676L29.0855 20.2204ZM30.789 15.128C30.789 13.0487 30.2678 11.2966 29.0785 10.0281L27.6195 11.3959C28.3502 12.1754 28.789 13.3673 28.789 15.128H30.789ZM38.18 10.136H37.18L39.0928 10.5444L38.18 10.136ZM39.908 7.96L39.2883 7.17505L39.2782 7.18324L39.908 7.96ZM44.58 7.544L43.9686 8.33529L43.977 8.34182L43.9856 8.34818L44.58 7.544ZM44.644 10.104L44.0014 10.8702L44.5754 11.3516L45.1987 10.936L44.644 10.104ZM39.396 10.904L40.2076 11.4883L40.213 11.4807L39.396 10.904ZM37.956 22.712L37.2489 22.0049L37.2489 22.0049L37.956 22.712ZM35.844 22.712L35.1369 23.4191L35.1369 23.4191L35.844 22.712ZM36.772 8.224H36.964V6.224H36.772V8.224ZM36.964 8.224C37.2218 8.224 37.2302 8.28693 37.1784 8.23647C37.1557 8.21439 37.1526 8.19845 37.1579 8.21389C37.1649 8.23445 37.18 8.29335 37.18 8.408H39.18C39.18 7.85232 39.0357 7.25347 38.5736 6.80353C38.1165 6.35841 37.5169 6.224 36.964 6.224V8.224ZM37.18 8.408V10.136H39.18V8.408H37.18ZM39.0928 10.5444C39.3827 9.89643 39.8527 9.29221 40.5378 8.73675L39.2782 7.18324C38.3846 7.90779 37.7027 8.75423 37.2672 9.72763L39.0928 10.5444ZM40.5276 8.74488C41.1853 8.2257 41.8357 8 42.5 8V6C41.3297 6 40.2521 6.4143 39.2884 7.17512L40.5276 8.74488ZM42.5 8C43.31 8 43.7471 8.16413 43.9686 8.33529L45.1914 6.75271C44.4743 6.19854 43.5246 6 42.5 6V8ZM43.9856 8.34818C44.2632 8.55336 44.316 8.72076 44.316 8.888H46.316C46.316 7.98858 45.8781 7.25998 45.1744 6.73982L43.9856 8.34818ZM44.316 8.888C44.316 9.04554 44.2763 9.14731 44.0893 9.27195L45.1987 10.936C45.9077 10.4634 46.316 9.75446 46.316 8.888H44.316ZM45.2866 9.33781C44.4749 8.65697 43.5497 8.272 42.532 8.272V10.272C43.0077 10.272 43.4905 10.4417 44.0014 10.8702L45.2866 9.33781ZM42.532 8.272C40.8818 8.272 39.5329 8.97604 38.579 10.3273L40.213 11.4807C40.7951 10.656 41.5369 10.272 42.532 10.272V8.272ZM38.5845 10.3197C37.6678 11.5929 37.244 13.1546 37.244 14.936H39.244C39.244 13.4747 39.5882 12.3485 40.2075 11.4883L38.5845 10.3197ZM37.244 14.936V21.784H39.244V14.936H37.244ZM37.244 21.784C37.244 21.9267 37.2274 22.0058 37.2169 22.0396C37.2078 22.069 37.21 22.0438 37.2489 22.0049L38.6631 23.4191C39.1258 22.9564 39.244 22.329 39.244 21.784H37.244ZM37.2489 22.0049C37.2878 21.966 37.313 21.9638 37.2836 21.9729C37.2498 21.9834 37.1707 22 37.028 22V24C37.573 24 38.2004 23.8818 38.6631 23.4191L37.2489 22.0049ZM37.028 22H36.772V24H37.028V22ZM36.772 22C36.6293 22 36.5502 21.9834 36.5164 21.9729C36.487 21.9638 36.5122 21.966 36.5511 22.0049L35.1369 23.4191C35.5996 23.8818 36.2271 24 36.772 24V22ZM36.5511 22.0049C36.59 22.0438 36.5922 22.069 36.5831 22.0396C36.5726 22.0058 36.556 21.9267 36.556 21.784H34.556C34.556 22.329 34.6742 22.9564 35.1369 23.4191L36.5511 22.0049ZM36.556 21.784V8.408H34.556V21.784H36.556ZM36.556 8.408C36.556 8.29335 36.5711 8.23445 36.5781 8.21389C36.5834 8.19845 36.5803 8.21439 36.5576 8.23647C36.5058 8.28693 36.5142 8.224 36.772 8.224V6.224C36.2191 6.224 35.6195 6.35841 35.1624 6.80353C34.7003 7.25347 34.556 7.85232 34.556 8.408H36.556ZM50.572 9.784H49.572L51.456 10.2514L50.572 9.784ZM58.316 8.056L57.6796 8.82737L57.6901 8.83599L57.7007 8.84432L58.316 8.056ZM60.108 10.936L59.1399 11.1864L60.0768 14.8094L61.072 11.2019L60.108 10.936ZM61.996 8.024L61.3872 7.23069L61.3872 7.23069L61.996 8.024ZM61.452 10.872L60.561 10.4181L60.5575 10.4248L60.5542 10.4316L61.452 10.872ZM49.132 8.224H49.324V6.224H49.132V8.224ZM49.324 8.224C49.5923 8.224 49.6086 8.28951 49.5621 8.24423C49.5109 8.19426 49.572 8.1955 49.572 8.44H51.572C51.572 7.87384 51.4252 7.26707 50.9579 6.81177C50.4954 6.36116 49.8877 6.224 49.324 6.224V8.224ZM49.572 8.44V9.784H51.572V8.44H49.572ZM51.456 10.2514C51.8791 9.4512 52.3871 8.9012 52.9611 8.54704C53.5332 8.19406 54.2283 8 55.084 8V6C53.913 6 52.8428 6.26994 51.9109 6.84496C50.9809 7.4188 50.2462 8.26079 49.688 9.31658L51.456 10.2514ZM55.084 8C56.196 8 57.0359 8.29634 57.6796 8.82737L58.9524 7.28463C57.8894 6.40766 56.5747 6 55.084 6V8ZM57.7007 8.84432C58.3761 9.3714 58.8663 10.1285 59.1399 11.1864L61.0761 10.6856C60.7097 9.26883 60.0053 8.10593 58.9313 7.26768L57.7007 8.84432ZM61.072 11.2019C61.3622 10.15 61.8791 9.37426 62.6048 8.81731L61.3872 7.23069C60.2782 8.08174 59.5365 9.2473 59.144 10.6701L61.072 11.2019ZM62.6048 8.81731C63.3414 8.25205 64.1816 7.968 65.164 7.968V5.968C63.757 5.968 62.4853 6.38795 61.3872 7.23069L62.6048 8.81731ZM65.164 7.968C66.8003 7.968 67.8584 8.43875 68.5322 9.22617C69.2315 10.0434 69.668 11.3753 69.668 13.4H71.668C71.668 11.1367 71.1871 9.25258 70.0518 7.92583C68.8909 6.56925 67.1971 5.968 65.164 5.968V7.968ZM69.668 13.4V21.816H71.668V13.4H69.668ZM69.668 21.816C69.668 21.9259 69.6528 21.9794 69.6472 21.995C69.6436 22.005 69.6484 21.9889 69.669 21.9699C69.7109 21.9311 69.679 22 69.388 22V24C69.9503 24 70.5584 23.8716 71.027 23.4381C71.5104 22.991 71.668 22.3857 71.668 21.816H69.668ZM69.388 22H69.196V24H69.388V22ZM69.196 22C68.9382 22 68.9298 21.9371 68.9816 21.9875C69.0043 22.0096 69.0074 22.0255 69.0021 22.0101C68.9951 21.9895 68.98 21.9306 68.98 21.816H66.98C66.98 22.3717 67.1243 22.9705 67.5864 23.4205C68.0435 23.8656 68.6431 24 69.196 24V22ZM68.98 21.816V13.56H66.98V21.816H68.98ZM68.98 13.56C68.98 12.0006 68.689 10.6481 67.9445 9.66736C67.1605 8.63457 66.0008 8.176 64.652 8.176V10.176C65.5218 10.176 66.0262 10.4481 66.3515 10.8766C66.7163 11.3572 66.98 12.1967 66.98 13.56H68.98ZM64.652 8.176C62.8212 8.176 61.3497 8.86978 60.561 10.4181L62.343 11.3259C62.7063 10.6129 63.3682 10.176 64.652 10.176V8.176ZM60.5542 10.4316C59.9057 11.7535 59.62 13.4608 59.62 15.48H61.62C61.62 13.6166 61.889 12.2518 62.3498 11.3124L60.5542 10.4316ZM59.62 15.48V21.816H61.62V15.48H59.62ZM59.62 21.816C59.62 21.9283 59.6049 21.9845 59.5985 22.0025C59.5941 22.0152 59.5981 21.9991 59.6197 21.9785C59.6668 21.9339 59.6466 22 59.372 22V24C59.9294 24 60.5332 23.8687 60.9963 23.4295C61.4691 22.9808 61.62 22.3786 61.62 21.816H59.62ZM59.372 22H59.148V24H59.372V22ZM59.148 22C58.8902 22 58.8818 21.9371 58.9336 21.9875C58.9563 22.0096 58.9594 22.0255 58.9541 22.0101C58.9471 21.9895 58.932 21.9306 58.932 21.816H56.932C56.932 22.3717 57.0763 22.9705 57.5384 23.4205C57.9955 23.8656 58.5951 24 59.148 24V22ZM58.932 21.816V13.56H56.932V21.816H58.932ZM58.932 13.56C58.932 11.9991 58.6378 10.645 57.8857 9.66369C57.095 8.63204 55.928 8.176 54.572 8.176V10.176C55.456 10.176 55.969 10.4506 56.2983 10.8803C56.6662 11.3604 56.932 12.1983 56.932 13.56H58.932ZM54.572 8.176C52.9325 8.176 51.5997 8.83872 50.7314 10.1864C49.9117 11.4586 49.572 13.2393 49.572 15.384H51.572C51.572 13.39 51.899 12.0668 52.4126 11.2696C52.8776 10.5479 53.5448 10.176 54.572 10.176V8.176ZM49.572 15.384V21.816H51.572V15.384H49.572ZM49.572 21.816C49.572 21.9283 49.5569 21.9845 49.5505 22.0025C49.5461 22.0152 49.5501 21.9991 49.5717 21.9785C49.6188 21.9339 49.5986 22 49.324 22V24C49.8814 24 50.4852 23.8687 50.9483 23.4295C51.4211 22.9808 51.572 22.3786 51.572 21.816H49.572ZM49.324 22H49.132V24H49.324V22ZM49.132 22C48.8742 22 48.8658 21.9371 48.9176 21.9875C48.9403 22.0096 48.9434 22.0255 48.9381 22.0101C48.9311 21.9895 48.916 21.9306 48.916 21.816H46.916C46.916 22.3717 47.0603 22.9705 47.5224 23.4205C47.9795 23.8656 48.5791 24 49.132 24V22ZM48.916 21.816V8.44H46.916V21.816H48.916ZM48.916 8.44C48.916 8.18881 48.9781 8.18409 48.9271 8.23511C48.8761 8.28612 48.8808 8.224 49.132 8.224V6.224C48.5725 6.224 47.9692 6.36455 47.5129 6.82089C47.0565 7.27724 46.916 7.88052 46.916 8.44H48.916ZM76.4818 2.272H76.7698V0.271999H76.4818V2.272ZM76.7698 2.272C77.0485 2.272 77.0728 2.34009 77.0317 2.3C76.9858 2.25533 77.0498 2.26466 77.0498 2.52H79.0498C79.0498 1.94334 78.9003 1.32866 78.4279 0.867999C77.9601 0.411908 77.3443 0.271999 76.7698 0.271999V2.272ZM77.0498 2.52V21.784H79.0498V2.52H77.0498ZM77.0498 21.784C77.0498 21.9018 77.0339 21.9627 77.0262 21.9849C77.0203 22.0017 77.0221 21.989 77.041 21.971C77.0827 21.9314 77.0547 22 76.7698 22V24C77.3381 24 77.9502 23.8659 78.4185 23.421C78.8964 22.967 79.0498 22.3569 79.0498 21.784H77.0498ZM76.7698 22H76.4818V24H76.7698V22ZM76.4818 22C76.2306 22 76.2258 21.9379 76.2769 21.9889C76.3279 22.0399 76.2658 22.0352 76.2658 21.784H74.2658C74.2658 22.3435 74.4063 22.9468 74.8626 23.4031C75.319 23.8595 75.9223 24 76.4818 24V22ZM76.2658 21.784V2.52H74.2658V21.784H76.2658ZM76.2658 2.52C76.2658 2.25172 76.3313 2.2354 76.286 2.28186C76.236 2.33315 76.2372 2.272 76.4818 2.272V0.271999C75.9156 0.271999 75.3088 0.41885 74.8535 0.886134C74.4029 1.3486 74.2658 1.95628 74.2658 2.52H76.2658ZM91.1078 3.672V2.672H90.1078V3.672H91.1078ZM88.3238 3.672H89.3238V2.672H88.3238V3.672ZM82.9158 2.272H96.5478V0.271999H82.9158V2.272ZM96.5478 2.272C96.7989 2.272 96.8037 2.33412 96.7526 2.28311C96.7016 2.23209 96.7638 2.23681 96.7638 2.488H98.7638C98.7638 1.92852 98.6232 1.32524 98.1669 0.868892C97.7105 0.412546 97.1072 0.271999 96.5478 0.271999V2.272ZM96.7638 2.488C96.7638 2.60264 96.7487 2.66155 96.7417 2.68211C96.7364 2.69755 96.7395 2.68161 96.7621 2.65953C96.814 2.60907 96.8055 2.672 96.5478 2.672V4.672C97.1006 4.672 97.7002 4.53759 98.1574 4.09247C98.6195 3.64253 98.7638 3.04368 98.7638 2.488H96.7638ZM96.5478 2.672H91.1078V4.672H96.5478V2.672ZM90.1078 3.672V21.784H92.1078V3.672H90.1078ZM90.1078 21.784C90.1078 22.0285 90.0466 22.0297 90.0979 21.9798C90.1444 21.9345 90.128 22 89.8598 22V24C90.4235 24 91.0311 23.8628 91.4936 23.4122C91.9609 22.9569 92.1078 22.3502 92.1078 21.784H90.1078ZM89.8598 22H89.5718V24H89.8598V22ZM89.5718 22C89.3035 22 89.2871 21.9345 89.3336 21.9798C89.3849 22.0297 89.3238 22.0285 89.3238 21.784H87.3238C87.3238 22.3502 87.4706 22.9569 87.9379 23.4122C88.4004 23.8628 89.008 24 89.5718 24V22ZM89.3238 21.784V3.672H87.3238V21.784H89.3238ZM88.3238 2.672H82.9158V4.672H88.3238V2.672ZM82.9158 2.672C82.658 2.672 82.6495 2.60907 82.7014 2.65953C82.724 2.68161 82.7271 2.69755 82.7218 2.68211C82.7148 2.66155 82.6998 2.60264 82.6998 2.488H80.6998C80.6998 3.04368 80.844 3.64253 81.3061 4.09247C81.7633 4.53759 82.3629 4.672 82.9158 4.672V2.672ZM82.6998 2.488C82.6998 2.23681 82.7619 2.23209 82.7109 2.28311C82.6598 2.33412 82.6646 2.272 82.9158 2.272V0.271999C82.3563 0.271999 81.753 0.412546 81.2966 0.868892C80.8403 1.32524 80.6998 1.92852 80.6998 2.488H82.6998Z"
        fill="url(#secondaryGradient)"
        mask="url(#path-1-outside-1_2_2)"
      />
    </svg>
  );
};

export default FormITsmall;
