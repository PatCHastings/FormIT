import React, { useState } from "react";

const FormITSvg = ({ isAnimated, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  // const [isClicked, setIsClicked] = useState(false);

  //   const handleClick = () => {
  //     setIsClicked(true);
  //   };

  return (
    <svg
      onClick={onClick}
      width="501"
      height="496"
      viewBox="10 -65 140 296"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        cursor: "pointer",
        transition: "transform 0.3s ease-in-out",

        overflow: "visible",
      }}
    >
      <defs>
        <linearGradient
          id="scrollingGradient"
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

          {isAnimated && (
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
      <mask
        id="path-1-outside-1_0_1"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="202"
        height="47"
        fill="black"
      >
        <rect fill="white" width="202" height="47" />
        <path d="M3.96 1.544H25.912C27.5333 1.544 28.344 2.35467 28.344 3.976C28.344 5.55466 27.5333 6.344 25.912 6.344H7.032V20.04H23.416C24.9947 20.04 25.784 20.8507 25.784 22.472C25.784 24.0507 24.9947 24.84 23.416 24.84H7.032V42.632C7.032 44.2107 6.2 45 4.536 45H3.96C2.296 45 1.464 44.1893 1.464 42.568V3.976C1.464 2.35467 2.296 1.544 3.96 1.544ZM38.482 17.16C41.5113 14.3013 45.2233 12.872 49.618 12.872C54.0127 12.872 57.7247 14.3013 60.754 17.16C63.7833 20.0187 65.298 24.0507 65.298 29.256C65.298 34.4613 63.7833 38.472 60.754 41.288C57.7247 44.104 54.0127 45.512 49.618 45.512C45.2233 45.512 41.5113 44.104 38.482 41.288C35.4527 38.472 33.938 34.4613 33.938 29.256C33.938 24.0507 35.4527 20.0187 38.482 17.16ZM56.978 20.424C55.1007 18.3333 52.6473 17.288 49.618 17.288C46.5887 17.288 44.114 18.3333 42.194 20.424C40.3167 22.472 39.378 25.416 39.378 29.256C39.378 33.0533 40.3167 35.9973 42.194 38.088C44.114 40.136 46.5887 41.16 49.618 41.16C52.6473 41.16 55.1007 40.136 56.978 38.088C58.898 35.9973 59.858 33.0533 59.858 29.256C59.858 25.416 58.898 22.472 56.978 20.424ZM75.104 13.448H75.488C77.1093 13.448 77.92 14.2373 77.92 15.816V19.272C78.6453 17.6507 79.7973 16.2 81.376 14.92C82.9973 13.64 84.7253 13 86.56 13C88.3947 13 89.7813 13.3627 90.72 14.088C91.7013 14.8133 92.192 15.7093 92.192 16.776C92.192 17.8 91.744 18.6107 90.848 19.208C89.5253 18.0987 88.1173 17.544 86.624 17.544C83.9787 17.544 81.888 18.632 80.352 20.808C78.816 22.9413 78.048 25.6293 78.048 28.872V42.568C78.048 43.4213 77.856 44.04 77.472 44.424C77.088 44.808 76.4693 45 75.616 45H75.104C74.2507 45 73.632 44.808 73.248 44.424C72.864 44.04 72.672 43.4213 72.672 42.568V15.816C72.672 14.2373 73.4827 13.448 75.104 13.448ZM101.104 13.448H101.488C103.152 13.448 103.984 14.2587 103.984 15.88V18.568C105.947 14.856 108.955 13 113.008 13C115.611 13 117.765 13.704 119.472 15.112C121.221 16.4773 122.416 18.3973 123.056 20.872C123.739 18.3973 124.997 16.456 126.832 15.048C128.667 13.64 130.779 12.936 133.168 12.936C140.507 12.936 144.176 17.224 144.176 25.8V42.632C144.176 44.2107 143.323 45 141.616 45H141.232C139.611 45 138.8 44.2107 138.8 42.632V26.12C138.8 20.2747 136.581 17.352 132.144 17.352C129.029 17.352 126.896 18.4827 125.744 20.744C124.635 23.0053 124.08 26.0773 124.08 29.96V42.632C124.08 44.2107 123.248 45 121.584 45H121.136C119.515 45 118.704 44.2107 118.704 42.632V26.12C118.704 20.2747 116.464 17.352 111.984 17.352C106.651 17.352 103.984 21.4907 103.984 29.768V42.632C103.984 44.2107 103.152 45 101.488 45H101.104C99.4827 45 98.672 44.2107 98.672 42.632V15.88C98.672 14.2587 99.4827 13.448 101.104 13.448ZM157.084 1.544H157.66C159.366 1.544 160.22 2.376 160.22 4.04V42.568C160.22 44.1893 159.366 45 157.66 45H157.084C155.462 45 154.652 44.1893 154.652 42.568V4.04C154.652 2.376 155.462 1.544 157.084 1.544ZM171.232 1.544H198.496C200.117 1.544 200.928 2.35467 200.928 3.976C200.928 5.55466 200.117 6.344 198.496 6.344H187.616V42.568C187.616 44.1893 186.784 45 185.12 45H184.544C182.88 45 182.048 44.1893 182.048 42.568V6.344H171.232C169.61 6.344 168.799 5.55466 168.799 3.976C168.799 2.35467 169.61 1.544 171.232 1.544Z" />
      </mask>
      {/* Shadow Path */}
      {isHovered && (
        <path
          d="M7.032 6.344V5.344H6.032V6.344H7.032ZM7.032 20.04H6.032V21.04H7.032V20.04ZM7.032 24.84V23.84H6.032V24.84H7.032ZM3.96 2.544H25.912V0.543999H3.96V2.544ZM25.912 2.544C26.5685 2.544 26.8772 2.70745 27.0289 2.85911C27.1805 3.01076 27.344 3.31948 27.344 3.976H29.344C29.344 3.01119 29.1021 2.1039 28.4431 1.44489C27.7841 0.785879 26.8768 0.543999 25.912 0.543999V2.544ZM27.344 3.976C27.344 4.60432 27.1843 4.89346 27.0384 5.03553C26.8875 5.1824 26.5751 5.344 25.912 5.344V7.344C26.8702 7.344 27.7738 7.11093 28.4336 6.46847C29.0984 5.8212 29.344 4.92634 29.344 3.976H27.344ZM25.912 5.344H7.032V7.344H25.912V5.344ZM6.032 6.344V20.04H8.032V6.344H6.032ZM7.032 21.04H23.416V19.04H7.032V21.04ZM23.416 21.04C24.0443 21.04 24.3335 21.1997 24.4755 21.3456C24.6224 21.4965 24.784 21.8089 24.784 22.472H26.784C26.784 21.5138 26.5509 20.6102 25.9085 19.9504C25.2612 19.2856 24.3663 19.04 23.416 19.04V21.04ZM24.784 22.472C24.784 23.1072 24.6259 23.3999 24.4849 23.5409C24.3439 23.6819 24.0512 23.84 23.416 23.84V25.84C24.3595 25.84 25.2508 25.6035 25.8991 24.9551C26.5475 24.3068 26.784 23.4155 26.784 22.472H24.784ZM23.416 23.84H7.032V25.84H23.416V23.84ZM6.032 24.84V42.632H8.032V24.84H6.032ZM6.032 42.632C6.032 43.2534 5.87086 43.5392 5.71974 43.6825C5.55876 43.8353 5.22661 44 4.536 44V46C5.50939 46 6.42524 45.7701 7.09626 45.1335C7.77714 44.4875 8.032 43.5893 8.032 42.632H6.032ZM4.536 44H3.96V46H4.536V44ZM3.96 44C3.27572 44 2.9474 43.8332 2.78586 43.6758C2.62915 43.5231 2.464 43.2178 2.464 42.568H0.464C0.464 43.5395 0.714851 44.4503 1.39014 45.1082C2.0606 45.7615 2.98028 46 3.96 46V44ZM2.464 42.568V3.976H0.464V42.568H2.464ZM2.464 3.976C2.464 3.32616 2.62915 3.02093 2.78586 2.86823C2.9474 2.71084 3.27572 2.544 3.96 2.544V0.543999C2.98028 0.543999 2.0606 0.782492 1.39014 1.43577C0.714851 2.09374 0.464 3.0045 0.464 3.976H2.464ZM38.482 17.16L37.7957 16.4327L37.7957 16.4327L38.482 17.16ZM60.754 17.16L61.4403 16.4327L61.4403 16.4327L60.754 17.16ZM60.754 41.288L61.4348 42.0204L61.4348 42.0204L60.754 41.288ZM38.482 41.288L37.8012 42.0204L37.8012 42.0204L38.482 41.288ZM56.978 20.424L56.234 21.0921L56.2411 21.1001L56.2485 21.1079L56.978 20.424ZM42.194 20.424L41.4575 19.7476L41.4568 19.7483L42.194 20.424ZM42.194 38.088L41.45 38.7561L41.4571 38.7641L41.4645 38.7719L42.194 38.088ZM56.978 38.088L56.2415 37.4116L56.2408 37.4123L56.978 38.088ZM39.1683 17.8873C42.0011 15.2141 45.463 13.872 49.618 13.872V11.872C44.9836 11.872 41.0216 13.3885 37.7957 16.4327L39.1683 17.8873ZM49.618 13.872C53.773 13.872 57.2349 15.2141 60.0677 17.8873L61.4403 16.4327C58.2144 13.3885 54.2524 11.872 49.618 11.872V13.872ZM60.0677 17.8873C62.8491 20.512 64.298 24.2526 64.298 29.256H66.298C66.298 23.8487 64.7176 19.5253 61.4403 16.4327L60.0677 17.8873ZM64.298 29.256C64.298 34.2601 62.8489 37.9753 60.0732 40.5556L61.4348 42.0204C64.7177 38.9687 66.298 34.6626 66.298 29.256H64.298ZM60.0732 40.5556C57.2411 43.1881 53.7774 44.512 49.618 44.512V46.512C54.2479 46.512 58.2082 45.0199 61.4348 42.0204L60.0732 40.5556ZM49.618 44.512C45.4586 44.512 41.9949 43.1881 39.1628 40.5556L37.8012 42.0204C41.0278 45.0199 44.9881 46.512 49.618 46.512V44.512ZM39.1628 40.5556C36.3871 37.9753 34.938 34.2601 34.938 29.256H32.938C32.938 34.6626 34.5183 38.9687 37.8012 42.0204L39.1628 40.5556ZM34.938 29.256C34.938 24.2526 36.3869 20.512 39.1683 17.8873L37.7957 16.4327C34.5184 19.5253 32.938 23.8487 32.938 29.256H34.938ZM57.722 19.7559C55.639 17.4361 52.9063 16.288 49.618 16.288V18.288C52.3884 18.288 54.5623 19.2305 56.234 21.0921L57.722 19.7559ZM49.618 16.288C46.3298 16.288 43.5807 17.4356 41.4575 19.7476L42.9305 21.1004C44.6473 19.231 46.8475 18.288 49.618 18.288V16.288ZM41.4568 19.7483C39.3551 22.0411 38.378 25.2621 38.378 29.256H40.378C40.378 25.5699 41.2783 22.9029 42.9312 21.0997L41.4568 19.7483ZM38.378 29.256C38.378 33.2123 39.3574 36.4257 41.45 38.7561L42.938 37.4199C41.276 35.5689 40.378 32.8944 40.378 29.256H38.378ZM41.4645 38.7719C43.5896 41.0387 46.3367 42.16 49.618 42.16V40.16C46.8407 40.16 44.6384 39.2333 42.9235 37.4041L41.4645 38.7719ZM49.618 42.16C52.8993 42.16 55.6301 41.0383 57.7152 38.7637L56.2408 37.4123C54.5712 39.2337 52.3953 40.16 49.618 40.16V42.16ZM57.7145 38.7644C59.8544 36.4343 60.858 33.2176 60.858 29.256H58.858C58.858 32.889 57.9416 35.5604 56.2415 37.4116L57.7145 38.7644ZM60.858 29.256C60.858 25.2567 59.8568 22.0326 57.7075 19.7401L56.2485 21.1079C57.9392 22.9114 58.858 25.5753 58.858 29.256H60.858ZM77.92 19.272H76.92L78.8328 19.6804L77.92 19.272ZM81.376 14.92L80.7563 14.135L80.7462 14.1432L81.376 14.92ZM90.72 14.088L90.1086 14.8793L90.117 14.8858L90.1256 14.8922L90.72 14.088ZM90.848 19.208L90.2054 19.9742L90.7794 20.4556L91.4027 20.04L90.848 19.208ZM80.352 20.808L81.1636 21.3923L81.169 21.3847L80.352 20.808ZM77.472 44.424L76.7649 43.7169L76.7649 43.7169L77.472 44.424ZM73.248 44.424L72.5409 45.1311L72.5409 45.1311L73.248 44.424ZM75.104 14.448H75.488V12.448H75.104V14.448ZM75.488 14.448C76.1511 14.448 76.4635 14.6096 76.6144 14.7565C76.7603 14.8985 76.92 15.1877 76.92 15.816H78.92C78.92 14.8657 78.6744 13.9708 78.0096 13.3235C77.3498 12.6811 76.4462 12.448 75.488 12.448V14.448ZM76.92 15.816V19.272H78.92V15.816H76.92ZM78.8328 19.6804C79.4854 18.2218 80.5314 16.8922 82.0058 15.6968L80.7462 14.1432C79.0633 15.5078 77.8053 17.0796 77.0072 18.8636L78.8328 19.6804ZM81.9956 15.7049C83.4639 14.5457 84.9784 14 86.56 14V12C84.4723 12 82.5307 12.7343 80.7564 14.1351L81.9956 15.7049ZM86.56 14C88.2874 14 89.4177 14.3455 90.1086 14.8793L91.3314 13.2967C90.1449 12.3799 88.502 12 86.56 12V14ZM90.1256 14.8922C90.8939 15.46 91.192 16.0754 91.192 16.776H93.192C93.192 15.3432 92.5088 14.1666 91.3144 13.2838L90.1256 14.8922ZM91.192 16.776C91.192 17.4455 90.9283 17.9526 90.2933 18.3759L91.4027 20.04C92.5597 19.2687 93.192 18.1545 93.192 16.776H91.192ZM91.4906 18.4418C90.0175 17.2063 88.3883 16.544 86.624 16.544V18.544C87.8463 18.544 89.0332 18.991 90.2054 19.9742L91.4906 18.4418ZM86.624 16.544C83.6511 16.544 81.2569 17.792 79.535 20.2313L81.169 21.3847C82.5191 19.472 84.3063 18.544 86.624 18.544V16.544ZM79.5405 20.2237C77.8558 22.5635 77.048 25.4693 77.048 28.872H79.048C79.048 25.7894 79.7762 23.3191 81.1635 21.3923L79.5405 20.2237ZM77.048 28.872V42.568H79.048V28.872H77.048ZM77.048 42.568C77.048 43.303 76.8782 43.6036 76.7649 43.7169L78.1791 45.1311C78.8338 44.4764 79.048 43.5396 79.048 42.568H77.048ZM76.7649 43.7169C76.6516 43.8302 76.3511 44 75.616 44V46C76.5876 46 77.5244 45.7858 78.1791 45.1311L76.7649 43.7169ZM75.616 44H75.104V46H75.616V44ZM75.104 44C74.369 44 74.0684 43.8302 73.9551 43.7169L72.5409 45.1311C73.1956 45.7858 74.1324 46 75.104 46V44ZM73.9551 43.7169C73.8418 43.6036 73.672 43.303 73.672 42.568H71.672C71.672 43.5396 71.8862 44.4764 72.5409 45.1311L73.9551 43.7169ZM73.672 42.568V15.816H71.672V42.568H73.672ZM73.672 15.816C73.672 15.1877 73.8317 14.8985 73.9776 14.7565C74.1285 14.6096 74.4409 14.448 75.104 14.448V12.448C74.1458 12.448 73.2422 12.6811 72.5824 13.3235C71.9176 13.9708 71.672 14.8657 71.672 15.816H73.672ZM103.984 18.568H102.984L104.868 19.0354L103.984 18.568ZM119.472 15.112L118.836 15.8834L118.846 15.892L118.857 15.9003L119.472 15.112ZM123.056 20.872L122.088 21.1224L123.025 24.7454L124.02 21.1379L123.056 20.872ZM126.832 15.048L126.223 14.2547L126.223 14.2547L126.832 15.048ZM125.744 20.744L124.853 20.2901L124.85 20.2968L124.846 20.3036L125.744 20.744ZM101.104 14.448H101.488V12.448H101.104V14.448ZM101.488 14.448C102.172 14.448 102.501 14.6148 102.662 14.7722C102.819 14.9249 102.984 15.2302 102.984 15.88H104.984C104.984 14.9085 104.733 13.9977 104.058 13.3398C103.387 12.6865 102.468 12.448 101.488 12.448V14.448ZM102.984 15.88V18.568H104.984V15.88H102.984ZM104.868 19.0354C105.782 17.3072 106.911 16.0612 108.237 15.243C109.561 14.4261 111.139 14 113.008 14V12C110.824 12 108.871 12.5019 107.187 13.541C105.505 14.5788 104.149 16.1168 103.1 18.1006L104.868 19.0354ZM113.008 14C115.421 14 117.339 14.6483 118.836 15.8834L120.108 14.3406C118.192 12.7597 115.8 12 113.008 12V14ZM118.857 15.9003C120.407 17.1101 121.494 18.8272 122.088 21.1224L124.024 20.6216C123.338 17.9675 122.036 15.8446 120.087 14.3237L118.857 15.9003ZM124.02 21.1379C124.652 18.8487 125.798 17.1023 127.441 15.8413L126.223 14.2547C124.197 15.8097 122.826 17.946 122.092 20.6061L124.02 21.1379ZM127.441 15.8413C129.095 14.572 130.991 13.936 133.168 13.936V11.936C130.566 11.936 128.239 12.7079 126.223 14.2547L127.441 15.8413ZM133.168 13.936C136.639 13.936 139.073 14.9427 140.664 16.8022C142.281 18.6914 143.176 21.6313 143.176 25.8H145.176C145.176 21.3927 144.236 17.9006 142.184 15.5018C140.106 13.0733 137.036 11.936 133.168 11.936V13.936ZM143.176 25.8V42.632H145.176V25.8H143.176ZM143.176 42.632C143.176 43.2463 143.014 43.529 142.857 43.6739C142.686 43.8324 142.334 44 141.616 44V46C142.605 46 143.533 45.7729 144.215 45.1421C144.912 44.4977 145.176 43.5964 145.176 42.632H143.176ZM141.616 44H141.232V46H141.616V44ZM141.232 44C140.569 44 140.256 43.8384 140.106 43.6915C139.96 43.5495 139.8 43.2603 139.8 42.632H137.8C137.8 43.5823 138.046 44.4772 138.71 45.1245C139.37 45.7669 140.274 46 141.232 46V44ZM139.8 42.632V26.12H137.8V42.632H139.8ZM139.8 26.12C139.8 23.0993 139.232 20.6508 137.933 18.9394C136.594 17.1759 134.602 16.352 132.144 16.352V18.352C134.123 18.352 135.46 18.9894 136.34 20.1486C137.259 21.3599 137.8 23.2954 137.8 26.12H139.8ZM132.144 16.352C128.756 16.352 126.218 17.6111 124.853 20.2901L126.635 21.1979C127.574 19.3542 129.303 18.352 132.144 18.352V16.352ZM124.846 20.3036C123.643 22.7562 123.08 25.9994 123.08 29.96H125.08C125.08 26.1552 125.626 23.2545 126.642 21.1844L124.846 20.3036ZM123.08 29.96V42.632H125.08V29.96H123.08ZM123.08 42.632C123.08 43.2534 122.919 43.5392 122.768 43.6825C122.607 43.8353 122.275 44 121.584 44V46C122.557 46 123.473 45.7701 124.144 45.1335C124.825 44.4875 125.08 43.5893 125.08 42.632H123.08ZM121.584 44H121.136V46H121.584V44ZM121.136 44C120.473 44 120.16 43.8384 120.01 43.6915C119.864 43.5495 119.704 43.2603 119.704 42.632H117.704C117.704 43.5823 117.95 44.4772 118.614 45.1245C119.274 45.7669 120.178 46 121.136 46V44ZM119.704 42.632V26.12H117.704V42.632H119.704ZM119.704 26.12C119.704 23.0977 119.13 20.6476 117.818 18.9357C116.467 17.1734 114.46 16.352 111.984 16.352V18.352C113.988 18.352 115.341 18.992 116.23 20.1523C117.158 21.363 117.704 23.2969 117.704 26.12H119.704ZM111.984 16.352C109.011 16.352 106.678 17.5321 105.143 19.9144C103.657 22.2212 102.984 25.554 102.984 29.768H104.984C104.984 25.7047 105.644 22.8294 106.825 20.9976C107.956 19.2413 109.623 18.352 111.984 18.352V16.352ZM102.984 29.768V42.632H104.984V29.768H102.984ZM102.984 42.632C102.984 43.2534 102.823 43.5392 102.672 43.6825C102.511 43.8353 102.179 44 101.488 44V46C102.461 46 103.377 45.7701 104.048 45.1335C104.729 44.4875 104.984 43.5893 104.984 42.632H102.984ZM101.488 44H101.104V46H101.488V44ZM101.104 44C100.441 44 100.128 43.8384 99.9776 43.6915C99.8317 43.5495 99.672 43.2603 99.672 42.632H97.672C97.672 43.5823 97.9176 44.4772 98.5824 45.1245C99.2422 45.7669 100.146 46 101.104 46V44ZM99.672 42.632V15.88H97.672V42.632H99.672ZM99.672 15.88C99.672 15.2235 99.8355 14.9148 99.9871 14.7631C100.139 14.6115 100.447 14.448 101.104 14.448V12.448C100.139 12.448 99.2319 12.6899 98.5729 13.3489C97.9139 14.0079 97.672 14.9152 97.672 15.88H99.672ZM157.084 2.544H157.66V0.543999H157.084V2.544ZM157.66 2.544C158.365 2.544 158.709 2.71609 158.881 2.884C159.049 3.04733 159.22 3.36866 159.22 4.04H161.22C161.22 3.04734 160.963 2.12066 160.278 1.452C159.596 0.787908 158.661 0.543999 157.66 0.543999V2.544ZM159.22 4.04V42.568H161.22V4.04H159.22ZM159.22 42.568C159.22 43.2111 159.053 43.513 158.891 43.667C158.719 43.8301 158.371 44 157.66 44V46C158.655 46 159.587 45.7646 160.268 45.117C160.96 44.4603 161.22 43.5463 161.22 42.568H159.22ZM157.66 44H157.084V46H157.66V44ZM157.084 44C156.427 44 156.118 43.8365 155.967 43.6849C155.815 43.5332 155.652 43.2245 155.652 42.568H153.652C153.652 43.5328 153.893 44.4401 154.552 45.0991C155.211 45.7581 156.119 46 157.084 46V44ZM155.652 42.568V4.04H153.652V42.568H155.652ZM155.652 4.04C155.652 3.35572 155.818 3.02739 155.976 2.86586C156.128 2.70915 156.434 2.544 157.084 2.544V0.543999C156.112 0.543999 155.201 0.794849 154.543 1.47013C153.89 2.1406 153.652 3.06028 153.652 4.04H155.652ZM187.616 6.344V5.344H186.616V6.344H187.616ZM182.048 6.344H183.048V5.344H182.048V6.344ZM171.232 2.544H198.496V0.543999H171.232V2.544ZM198.496 2.544C199.152 2.544 199.461 2.70745 199.612 2.85911C199.764 3.01076 199.928 3.31948 199.928 3.976H201.928C201.928 3.01119 201.686 2.1039 201.027 1.44489C200.368 0.785879 199.46 0.543999 198.496 0.543999V2.544ZM199.928 3.976C199.928 4.60432 199.768 4.89346 199.622 5.03553C199.471 5.1824 199.159 5.344 198.496 5.344V7.344C199.454 7.344 200.357 7.11093 201.017 6.46847C201.682 5.8212 201.928 4.92634 201.928 3.976H199.928ZM198.496 5.344H187.616V7.344H198.496V5.344ZM186.616 6.344V42.568H188.616V6.344H186.616ZM186.616 42.568C186.616 43.2178 186.45 43.5231 186.294 43.6758C186.132 43.8332 185.804 44 185.12 44V46C186.099 46 187.019 45.7615 187.689 45.1082C188.365 44.4503 188.616 43.5395 188.616 42.568H186.616ZM185.12 44H184.544V46H185.12V44ZM184.544 44C183.859 44 183.531 43.8332 183.369 43.6758C183.213 43.5231 183.048 43.2178 183.048 42.568H181.048C181.048 43.5395 181.298 44.4503 181.974 45.1082C182.644 45.7615 183.564 46 184.544 46V44ZM183.048 42.568V6.344H181.048V42.568H183.048ZM182.048 5.344H171.232V7.344H182.048V5.344ZM171.232 5.344C170.568 5.344 170.256 5.1824 170.105 5.03553C169.959 4.89346 169.799 4.60432 169.799 3.976H167.799C167.799 4.92634 168.045 5.8212 168.71 6.46847C169.37 7.11093 170.273 7.344 171.232 7.344V5.344ZM169.799 3.976C169.799 3.31948 169.963 3.01076 170.115 2.85911C170.266 2.70745 170.575 2.544 171.232 2.544V0.543999C170.267 0.543999 169.359 0.785879 168.7 1.44489C168.041 2.1039 167.799 3.01119 167.799 3.976H169.799Z"
          fill="url(#scrollingGradient)"
          style={{
            filter: "blur(5px)",
            opacity: 1,
            transition: "opacity 0.5s ease-in-out",
            pointerEvents: "none",
          }}
        />
      )}
      <path
        d="M7.032 6.344V5.344H6.032V6.344H7.032ZM7.032 20.04H6.032V21.04H7.032V20.04ZM7.032 24.84V23.84H6.032V24.84H7.032ZM3.96 2.544H25.912V0.543999H3.96V2.544ZM25.912 2.544C26.5685 2.544 26.8772 2.70745 27.0289 2.85911C27.1805 3.01076 27.344 3.31948 27.344 3.976H29.344C29.344 3.01119 29.1021 2.1039 28.4431 1.44489C27.7841 0.785879 26.8768 0.543999 25.912 0.543999V2.544ZM27.344 3.976C27.344 4.60432 27.1843 4.89346 27.0384 5.03553C26.8875 5.1824 26.5751 5.344 25.912 5.344V7.344C26.8702 7.344 27.7738 7.11093 28.4336 6.46847C29.0984 5.8212 29.344 4.92634 29.344 3.976H27.344ZM25.912 5.344H7.032V7.344H25.912V5.344ZM6.032 6.344V20.04H8.032V6.344H6.032ZM7.032 21.04H23.416V19.04H7.032V21.04ZM23.416 21.04C24.0443 21.04 24.3335 21.1997 24.4755 21.3456C24.6224 21.4965 24.784 21.8089 24.784 22.472H26.784C26.784 21.5138 26.5509 20.6102 25.9085 19.9504C25.2612 19.2856 24.3663 19.04 23.416 19.04V21.04ZM24.784 22.472C24.784 23.1072 24.6259 23.3999 24.4849 23.5409C24.3439 23.6819 24.0512 23.84 23.416 23.84V25.84C24.3595 25.84 25.2508 25.6035 25.8991 24.9551C26.5475 24.3068 26.784 23.4155 26.784 22.472H24.784ZM23.416 23.84H7.032V25.84H23.416V23.84ZM6.032 24.84V42.632H8.032V24.84H6.032ZM6.032 42.632C6.032 43.2534 5.87086 43.5392 5.71974 43.6825C5.55876 43.8353 5.22661 44 4.536 44V46C5.50939 46 6.42524 45.7701 7.09626 45.1335C7.77714 44.4875 8.032 43.5893 8.032 42.632H6.032ZM4.536 44H3.96V46H4.536V44ZM3.96 44C3.27572 44 2.9474 43.8332 2.78586 43.6758C2.62915 43.5231 2.464 43.2178 2.464 42.568H0.464C0.464 43.5395 0.714851 44.4503 1.39014 45.1082C2.0606 45.7615 2.98028 46 3.96 46V44ZM2.464 42.568V3.976H0.464V42.568H2.464ZM2.464 3.976C2.464 3.32616 2.62915 3.02093 2.78586 2.86823C2.9474 2.71084 3.27572 2.544 3.96 2.544V0.543999C2.98028 0.543999 2.0606 0.782492 1.39014 1.43577C0.714851 2.09374 0.464 3.0045 0.464 3.976H2.464ZM38.482 17.16L37.7957 16.4327L37.7957 16.4327L38.482 17.16ZM60.754 17.16L61.4403 16.4327L61.4403 16.4327L60.754 17.16ZM60.754 41.288L61.4348 42.0204L61.4348 42.0204L60.754 41.288ZM38.482 41.288L37.8012 42.0204L37.8012 42.0204L38.482 41.288ZM56.978 20.424L56.234 21.0921L56.2411 21.1001L56.2485 21.1079L56.978 20.424ZM42.194 20.424L41.4575 19.7476L41.4568 19.7483L42.194 20.424ZM42.194 38.088L41.45 38.7561L41.4571 38.7641L41.4645 38.7719L42.194 38.088ZM56.978 38.088L56.2415 37.4116L56.2408 37.4123L56.978 38.088ZM39.1683 17.8873C42.0011 15.2141 45.463 13.872 49.618 13.872V11.872C44.9836 11.872 41.0216 13.3885 37.7957 16.4327L39.1683 17.8873ZM49.618 13.872C53.773 13.872 57.2349 15.2141 60.0677 17.8873L61.4403 16.4327C58.2144 13.3885 54.2524 11.872 49.618 11.872V13.872ZM60.0677 17.8873C62.8491 20.512 64.298 24.2526 64.298 29.256H66.298C66.298 23.8487 64.7176 19.5253 61.4403 16.4327L60.0677 17.8873ZM64.298 29.256C64.298 34.2601 62.8489 37.9753 60.0732 40.5556L61.4348 42.0204C64.7177 38.9687 66.298 34.6626 66.298 29.256H64.298ZM60.0732 40.5556C57.2411 43.1881 53.7774 44.512 49.618 44.512V46.512C54.2479 46.512 58.2082 45.0199 61.4348 42.0204L60.0732 40.5556ZM49.618 44.512C45.4586 44.512 41.9949 43.1881 39.1628 40.5556L37.8012 42.0204C41.0278 45.0199 44.9881 46.512 49.618 46.512V44.512ZM39.1628 40.5556C36.3871 37.9753 34.938 34.2601 34.938 29.256H32.938C32.938 34.6626 34.5183 38.9687 37.8012 42.0204L39.1628 40.5556ZM34.938 29.256C34.938 24.2526 36.3869 20.512 39.1683 17.8873L37.7957 16.4327C34.5184 19.5253 32.938 23.8487 32.938 29.256H34.938ZM57.722 19.7559C55.639 17.4361 52.9063 16.288 49.618 16.288V18.288C52.3884 18.288 54.5623 19.2305 56.234 21.0921L57.722 19.7559ZM49.618 16.288C46.3298 16.288 43.5807 17.4356 41.4575 19.7476L42.9305 21.1004C44.6473 19.231 46.8475 18.288 49.618 18.288V16.288ZM41.4568 19.7483C39.3551 22.0411 38.378 25.2621 38.378 29.256H40.378C40.378 25.5699 41.2783 22.9029 42.9312 21.0997L41.4568 19.7483ZM38.378 29.256C38.378 33.2123 39.3574 36.4257 41.45 38.7561L42.938 37.4199C41.276 35.5689 40.378 32.8944 40.378 29.256H38.378ZM41.4645 38.7719C43.5896 41.0387 46.3367 42.16 49.618 42.16V40.16C46.8407 40.16 44.6384 39.2333 42.9235 37.4041L41.4645 38.7719ZM49.618 42.16C52.8993 42.16 55.6301 41.0383 57.7152 38.7637L56.2408 37.4123C54.5712 39.2337 52.3953 40.16 49.618 40.16V42.16ZM57.7145 38.7644C59.8544 36.4343 60.858 33.2176 60.858 29.256H58.858C58.858 32.889 57.9416 35.5604 56.2415 37.4116L57.7145 38.7644ZM60.858 29.256C60.858 25.2567 59.8568 22.0326 57.7075 19.7401L56.2485 21.1079C57.9392 22.9114 58.858 25.5753 58.858 29.256H60.858ZM77.92 19.272H76.92L78.8328 19.6804L77.92 19.272ZM81.376 14.92L80.7563 14.135L80.7462 14.1432L81.376 14.92ZM90.72 14.088L90.1086 14.8793L90.117 14.8858L90.1256 14.8922L90.72 14.088ZM90.848 19.208L90.2054 19.9742L90.7794 20.4556L91.4027 20.04L90.848 19.208ZM80.352 20.808L81.1636 21.3923L81.169 21.3847L80.352 20.808ZM77.472 44.424L76.7649 43.7169L76.7649 43.7169L77.472 44.424ZM73.248 44.424L72.5409 45.1311L72.5409 45.1311L73.248 44.424ZM75.104 14.448H75.488V12.448H75.104V14.448ZM75.488 14.448C76.1511 14.448 76.4635 14.6096 76.6144 14.7565C76.7603 14.8985 76.92 15.1877 76.92 15.816H78.92C78.92 14.8657 78.6744 13.9708 78.0096 13.3235C77.3498 12.6811 76.4462 12.448 75.488 12.448V14.448ZM76.92 15.816V19.272H78.92V15.816H76.92ZM78.8328 19.6804C79.4854 18.2218 80.5314 16.8922 82.0058 15.6968L80.7462 14.1432C79.0633 15.5078 77.8053 17.0796 77.0072 18.8636L78.8328 19.6804ZM81.9956 15.7049C83.4639 14.5457 84.9784 14 86.56 14V12C84.4723 12 82.5307 12.7343 80.7564 14.1351L81.9956 15.7049ZM86.56 14C88.2874 14 89.4177 14.3455 90.1086 14.8793L91.3314 13.2967C90.1449 12.3799 88.502 12 86.56 12V14ZM90.1256 14.8922C90.8939 15.46 91.192 16.0754 91.192 16.776H93.192C93.192 15.3432 92.5088 14.1666 91.3144 13.2838L90.1256 14.8922ZM91.192 16.776C91.192 17.4455 90.9283 17.9526 90.2933 18.3759L91.4027 20.04C92.5597 19.2687 93.192 18.1545 93.192 16.776H91.192ZM91.4906 18.4418C90.0175 17.2063 88.3883 16.544 86.624 16.544V18.544C87.8463 18.544 89.0332 18.991 90.2054 19.9742L91.4906 18.4418ZM86.624 16.544C83.6511 16.544 81.2569 17.792 79.535 20.2313L81.169 21.3847C82.5191 19.472 84.3063 18.544 86.624 18.544V16.544ZM79.5405 20.2237C77.8558 22.5635 77.048 25.4693 77.048 28.872H79.048C79.048 25.7894 79.7762 23.3191 81.1635 21.3923L79.5405 20.2237ZM77.048 28.872V42.568H79.048V28.872H77.048ZM77.048 42.568C77.048 43.303 76.8782 43.6036 76.7649 43.7169L78.1791 45.1311C78.8338 44.4764 79.048 43.5396 79.048 42.568H77.048ZM76.7649 43.7169C76.6516 43.8302 76.3511 44 75.616 44V46C76.5876 46 77.5244 45.7858 78.1791 45.1311L76.7649 43.7169ZM75.616 44H75.104V46H75.616V44ZM75.104 44C74.369 44 74.0684 43.8302 73.9551 43.7169L72.5409 45.1311C73.1956 45.7858 74.1324 46 75.104 46V44ZM73.9551 43.7169C73.8418 43.6036 73.672 43.303 73.672 42.568H71.672C71.672 43.5396 71.8862 44.4764 72.5409 45.1311L73.9551 43.7169ZM73.672 42.568V15.816H71.672V42.568H73.672ZM73.672 15.816C73.672 15.1877 73.8317 14.8985 73.9776 14.7565C74.1285 14.6096 74.4409 14.448 75.104 14.448V12.448C74.1458 12.448 73.2422 12.6811 72.5824 13.3235C71.9176 13.9708 71.672 14.8657 71.672 15.816H73.672ZM103.984 18.568H102.984L104.868 19.0354L103.984 18.568ZM119.472 15.112L118.836 15.8834L118.846 15.892L118.857 15.9003L119.472 15.112ZM123.056 20.872L122.088 21.1224L123.025 24.7454L124.02 21.1379L123.056 20.872ZM126.832 15.048L126.223 14.2547L126.223 14.2547L126.832 15.048ZM125.744 20.744L124.853 20.2901L124.85 20.2968L124.846 20.3036L125.744 20.744ZM101.104 14.448H101.488V12.448H101.104V14.448ZM101.488 14.448C102.172 14.448 102.501 14.6148 102.662 14.7722C102.819 14.9249 102.984 15.2302 102.984 15.88H104.984C104.984 14.9085 104.733 13.9977 104.058 13.3398C103.387 12.6865 102.468 12.448 101.488 12.448V14.448ZM102.984 15.88V18.568H104.984V15.88H102.984ZM104.868 19.0354C105.782 17.3072 106.911 16.0612 108.237 15.243C109.561 14.4261 111.139 14 113.008 14V12C110.824 12 108.871 12.5019 107.187 13.541C105.505 14.5788 104.149 16.1168 103.1 18.1006L104.868 19.0354ZM113.008 14C115.421 14 117.339 14.6483 118.836 15.8834L120.108 14.3406C118.192 12.7597 115.8 12 113.008 12V14ZM118.857 15.9003C120.407 17.1101 121.494 18.8272 122.088 21.1224L124.024 20.6216C123.338 17.9675 122.036 15.8446 120.087 14.3237L118.857 15.9003ZM124.02 21.1379C124.652 18.8487 125.798 17.1023 127.441 15.8413L126.223 14.2547C124.197 15.8097 122.826 17.946 122.092 20.6061L124.02 21.1379ZM127.441 15.8413C129.095 14.572 130.991 13.936 133.168 13.936V11.936C130.566 11.936 128.239 12.7079 126.223 14.2547L127.441 15.8413ZM133.168 13.936C136.639 13.936 139.073 14.9427 140.664 16.8022C142.281 18.6914 143.176 21.6313 143.176 25.8H145.176C145.176 21.3927 144.236 17.9006 142.184 15.5018C140.106 13.0733 137.036 11.936 133.168 11.936V13.936ZM143.176 25.8V42.632H145.176V25.8H143.176ZM143.176 42.632C143.176 43.2463 143.014 43.529 142.857 43.6739C142.686 43.8324 142.334 44 141.616 44V46C142.605 46 143.533 45.7729 144.215 45.1421C144.912 44.4977 145.176 43.5964 145.176 42.632H143.176ZM141.616 44H141.232V46H141.616V44ZM141.232 44C140.569 44 140.256 43.8384 140.106 43.6915C139.96 43.5495 139.8 43.2603 139.8 42.632H137.8C137.8 43.5823 138.046 44.4772 138.71 45.1245C139.37 45.7669 140.274 46 141.232 46V44ZM139.8 42.632V26.12H137.8V42.632H139.8ZM139.8 26.12C139.8 23.0993 139.232 20.6508 137.933 18.9394C136.594 17.1759 134.602 16.352 132.144 16.352V18.352C134.123 18.352 135.46 18.9894 136.34 20.1486C137.259 21.3599 137.8 23.2954 137.8 26.12H139.8ZM132.144 16.352C128.756 16.352 126.218 17.6111 124.853 20.2901L126.635 21.1979C127.574 19.3542 129.303 18.352 132.144 18.352V16.352ZM124.846 20.3036C123.643 22.7562 123.08 25.9994 123.08 29.96H125.08C125.08 26.1552 125.626 23.2545 126.642 21.1844L124.846 20.3036ZM123.08 29.96V42.632H125.08V29.96H123.08ZM123.08 42.632C123.08 43.2534 122.919 43.5392 122.768 43.6825C122.607 43.8353 122.275 44 121.584 44V46C122.557 46 123.473 45.7701 124.144 45.1335C124.825 44.4875 125.08 43.5893 125.08 42.632H123.08ZM121.584 44H121.136V46H121.584V44ZM121.136 44C120.473 44 120.16 43.8384 120.01 43.6915C119.864 43.5495 119.704 43.2603 119.704 42.632H117.704C117.704 43.5823 117.95 44.4772 118.614 45.1245C119.274 45.7669 120.178 46 121.136 46V44ZM119.704 42.632V26.12H117.704V42.632H119.704ZM119.704 26.12C119.704 23.0977 119.13 20.6476 117.818 18.9357C116.467 17.1734 114.46 16.352 111.984 16.352V18.352C113.988 18.352 115.341 18.992 116.23 20.1523C117.158 21.363 117.704 23.2969 117.704 26.12H119.704ZM111.984 16.352C109.011 16.352 106.678 17.5321 105.143 19.9144C103.657 22.2212 102.984 25.554 102.984 29.768H104.984C104.984 25.7047 105.644 22.8294 106.825 20.9976C107.956 19.2413 109.623 18.352 111.984 18.352V16.352ZM102.984 29.768V42.632H104.984V29.768H102.984ZM102.984 42.632C102.984 43.2534 102.823 43.5392 102.672 43.6825C102.511 43.8353 102.179 44 101.488 44V46C102.461 46 103.377 45.7701 104.048 45.1335C104.729 44.4875 104.984 43.5893 104.984 42.632H102.984ZM101.488 44H101.104V46H101.488V44ZM101.104 44C100.441 44 100.128 43.8384 99.9776 43.6915C99.8317 43.5495 99.672 43.2603 99.672 42.632H97.672C97.672 43.5823 97.9176 44.4772 98.5824 45.1245C99.2422 45.7669 100.146 46 101.104 46V44ZM99.672 42.632V15.88H97.672V42.632H99.672ZM99.672 15.88C99.672 15.2235 99.8355 14.9148 99.9871 14.7631C100.139 14.6115 100.447 14.448 101.104 14.448V12.448C100.139 12.448 99.2319 12.6899 98.5729 13.3489C97.9139 14.0079 97.672 14.9152 97.672 15.88H99.672ZM157.084 2.544H157.66V0.543999H157.084V2.544ZM157.66 2.544C158.365 2.544 158.709 2.71609 158.881 2.884C159.049 3.04733 159.22 3.36866 159.22 4.04H161.22C161.22 3.04734 160.963 2.12066 160.278 1.452C159.596 0.787908 158.661 0.543999 157.66 0.543999V2.544ZM159.22 4.04V42.568H161.22V4.04H159.22ZM159.22 42.568C159.22 43.2111 159.053 43.513 158.891 43.667C158.719 43.8301 158.371 44 157.66 44V46C158.655 46 159.587 45.7646 160.268 45.117C160.96 44.4603 161.22 43.5463 161.22 42.568H159.22ZM157.66 44H157.084V46H157.66V44ZM157.084 44C156.427 44 156.118 43.8365 155.967 43.6849C155.815 43.5332 155.652 43.2245 155.652 42.568H153.652C153.652 43.5328 153.893 44.4401 154.552 45.0991C155.211 45.7581 156.119 46 157.084 46V44ZM155.652 42.568V4.04H153.652V42.568H155.652ZM155.652 4.04C155.652 3.35572 155.818 3.02739 155.976 2.86586C156.128 2.70915 156.434 2.544 157.084 2.544V0.543999C156.112 0.543999 155.201 0.794849 154.543 1.47013C153.89 2.1406 153.652 3.06028 153.652 4.04H155.652ZM187.616 6.344V5.344H186.616V6.344H187.616ZM182.048 6.344H183.048V5.344H182.048V6.344ZM171.232 2.544H198.496V0.543999H171.232V2.544ZM198.496 2.544C199.152 2.544 199.461 2.70745 199.612 2.85911C199.764 3.01076 199.928 3.31948 199.928 3.976H201.928C201.928 3.01119 201.686 2.1039 201.027 1.44489C200.368 0.785879 199.46 0.543999 198.496 0.543999V2.544ZM199.928 3.976C199.928 4.60432 199.768 4.89346 199.622 5.03553C199.471 5.1824 199.159 5.344 198.496 5.344V7.344C199.454 7.344 200.357 7.11093 201.017 6.46847C201.682 5.8212 201.928 4.92634 201.928 3.976H199.928ZM198.496 5.344H187.616V7.344H198.496V5.344ZM186.616 6.344V42.568H188.616V6.344H186.616ZM186.616 42.568C186.616 43.2178 186.45 43.5231 186.294 43.6758C186.132 43.8332 185.804 44 185.12 44V46C186.099 46 187.019 45.7615 187.689 45.1082C188.365 44.4503 188.616 43.5395 188.616 42.568H186.616ZM185.12 44H184.544V46H185.12V44ZM184.544 44C183.859 44 183.531 43.8332 183.369 43.6758C183.213 43.5231 183.048 43.2178 183.048 42.568H181.048C181.048 43.5395 181.298 44.4503 181.974 45.1082C182.644 45.7615 183.564 46 184.544 46V44ZM183.048 42.568V6.344H181.048V42.568H183.048ZM182.048 5.344H171.232V7.344H182.048V5.344ZM171.232 5.344C170.568 5.344 170.256 5.1824 170.105 5.03553C169.959 4.89346 169.799 4.60432 169.799 3.976H167.799C167.799 4.92634 168.045 5.8212 168.71 6.46847C169.37 7.11093 170.273 7.344 171.232 7.344V5.344ZM169.799 3.976C169.799 3.31948 169.963 3.01076 170.115 2.85911C170.266 2.70745 170.575 2.544 171.232 2.544V0.543999C170.267 0.543999 169.359 0.785879 168.7 1.44489C168.041 2.1039 167.799 3.01119 167.799 3.976H169.799Z"
        fill="url(#scrollingGradient)"
        mask="url(#path-1-outside-1_0_1)"
      />
      <g transform="translate(45, 22), scale(0.4)">
        <path
          d="M15.9775 0.00056276C15.9447 0.0065033 15.9118 0.015413 15.882 0.0243234H2.67486C1.21205 0.0243234 0 1.20939 0 2.66176V31.8874C0 33.6011 1.42699 35 3.15251 35H22.8318C24.5573 35 25.9843 33.6011 25.9843 31.8874V10.0513C26.0052 9.95034 26.0052 9.84341 25.9843 9.74243V9.52858C25.9903 9.32662 25.9127 9.12762 25.7694 8.98209L16.9806 0.238169C16.8343 0.0956054 16.6343 0.0183836 16.4313 0.0243234H16.1924C16.1238 0.0065033 16.0491 -0.00240713 15.9775 0.00056276ZM2.67486 1.545H15.2849V7.8891C15.2849 9.41869 16.5417 10.6691 18.0792 10.6691H24.4558V31.8874C24.4558 32.7754 23.7334 33.4793 22.8318 33.4793H3.15251C2.25094 33.4793 1.52849 32.7754 1.52849 31.8874V2.66176C1.52849 2.03507 2.03301 1.545 2.67486 1.545ZM16.8134 2.25782L23.7394 9.14841H18.0792C17.3657 9.14841 16.8134 8.59895 16.8134 7.8891V2.25782ZM6.8782 17.5122C6.45727 17.5122 6.11396 17.8537 6.11396 18.2725C6.11396 18.6913 6.45727 19.0328 6.8782 19.0328C7.29914 19.0328 7.64245 18.6913 7.64245 18.2725C7.64245 17.8537 7.29914 17.5122 6.8782 17.5122ZM9.93518 17.5122V19.0328H19.1061V17.5122H9.93518ZM6.8782 21.3139C6.45727 21.3139 6.11396 21.6554 6.11396 22.0742C6.11396 22.493 6.45727 22.8345 6.8782 22.8345C7.29914 22.8345 7.64245 22.493 7.64245 22.0742C7.64245 21.6554 7.29914 21.3139 6.8782 21.3139ZM9.93518 21.3139V22.8345H19.1061V21.3139H9.93518ZM6.8782 25.1156C6.45727 25.1156 6.11396 25.4571 6.11396 25.8759C6.11396 26.2947 6.45727 26.6363 6.8782 26.6363C7.29914 26.6363 7.64245 26.2947 7.64245 25.8759C7.64245 25.4571 7.29914 25.1156 6.8782 25.1156ZM9.93518 25.1156V26.6363H19.1061V25.1156H9.93518Z"
          fill="turquoise"
        />
      </g>
    </svg>
  );
};

export default FormITSvg;
