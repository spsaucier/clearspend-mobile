import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Path, Svg } from 'react-native-svg';

type Props = {
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export const LogoWithTagline = ({ style, testID }: Props) => (
  <View style={style} testID={testID}>
    <Svg viewBox="0 0 1018 374" fill="none">
      <Path
        d="M996.238 37.6983L923.364 0.814135C919.77 -1.00446 916.77 0.319759 916.77 3.82888V25.9261L998.961 56.919V43.067C998.961 40.8591 997.755 38.4642 996.238 37.6983Z"
        fill="#43FA76"
      />
      <Path
        d="M965.75 109.061L1015.98 109.033C1017.1 109.033 1018 107.496 1018 105.598V93.657L961.541 86.3955V103.992C961.541 106.81 963.45 109.064 965.75 109.061Z"
        fill="#43FA76"
      />
      <Path
        d="M916.77 39.0582V61.1529C916.77 64.662 919.77 68.0686 923.364 68.75L1018 86.5594V74.6182C1018 72.7227 1017.1 70.899 1015.98 70.543L916.77 39.0582Z"
        fill="#43FA76"
      />
      <Path
        d="M92.662 200.507H91.7096L91.6455 201.462C91.0987 209.682 88.0287 217.192 83.0053 222.609C80.0501 225.779 76.4351 228.266 72.4144 229.894C67.8402 231.774 62.5473 232.727 56.6819 232.727C50.008 232.727 43.9784 231.343 38.7651 228.61C33.9804 226.103 29.8631 222.463 26.5313 217.783C20.4991 209.313 17.1776 197.582 17.1776 184.741C17.1776 171.986 20.4991 160.308 26.5313 151.858C29.8683 147.189 33.9753 143.551 38.7651 141.046C43.981 138.316 50.008 136.933 56.6819 136.933C67.5321 136.933 76.2262 140.188 82.5202 146.61C88.6807 152.89 90.8908 160.595 91.6634 164.629L91.8226 165.462H108.969L108.826 164.309C107.405 152.638 101.732 141.896 92.8853 134.131C83.3878 125.839 70.8717 121.459 56.6922 121.459C48.4782 121.459 40.7236 123.055 33.6698 126.201C26.8094 129.266 20.6908 133.769 15.7299 139.405C10.7065 145.07 6.80225 151.817 4.11986 159.455C1.38613 167.239 0 175.748 0 184.741C0 193.778 1.38613 202.318 4.11986 210.127C6.79969 217.786 10.7065 224.548 15.7273 230.227C20.6856 235.87 26.8057 240.38 33.6698 243.448C40.7211 246.596 48.4679 248.195 56.6922 248.195C71.1797 248.195 83.7497 243.646 93.0444 235.042C97.5372 230.854 101.18 225.843 103.774 220.281C106.508 214.395 108.217 208.087 108.828 201.629L108.944 200.502H92.662V200.507Z"
        fill="white"
      />
      <Path
        d="M522.689 196.38C520.636 192.026 517.555 188.499 513.315 185.566C505.275 180.008 493.773 177.157 480.459 173.855C479.432 173.599 478.436 173.358 477.451 173.118C469.514 171.184 462.66 169.514 457.914 166.532C452.878 163.369 450.629 158.999 450.629 152.363C450.629 147.767 452.775 143.936 456.831 141.282C461.174 138.441 467.689 136.94 475.672 136.94C484.848 136.94 491.648 138.892 496.463 142.911C501.084 146.753 503.846 152.537 504.934 160.554L505.055 161.44H522.176L522.086 160.334C521.572 154.115 520.081 148.469 517.63 143.557C515.288 138.827 511.946 134.66 507.835 131.344C499.823 124.881 488.696 121.467 475.656 121.467C469.044 121.467 463.009 122.235 457.722 123.772C452.552 125.266 448.086 127.481 444.451 130.352C437.238 136.054 433.426 144.248 433.426 154.043C433.426 159.729 434.71 164.801 437.21 169.081C439.425 172.864 442.685 176.181 446.902 178.94C454.736 184.063 464.87 186.701 473.739 188.77C486.419 191.696 495.814 194.044 501.42 197.635C504.1 199.354 505.889 201.314 507.052 203.806C508.215 206.298 508.769 209.382 508.769 213.45C508.769 218.957 506.716 223.59 502.827 226.846C498.168 230.749 491.019 232.737 481.542 232.737C469.948 232.737 460.984 229.988 454.898 224.566C449.585 219.833 446.445 213.068 445.565 204.459L445.47 203.537H428.316L428.382 204.625C429.204 218.08 434.887 229.276 444.81 237.004C454.231 244.337 466.932 248.213 481.537 248.213C488.958 248.213 495.655 247.247 501.477 245.344C506.903 243.569 511.564 240.974 515.338 237.632C518.82 234.565 521.569 230.757 523.382 226.49C525.112 222.363 525.99 217.93 525.962 213.457C525.967 206.611 524.894 201.029 522.689 196.38Z"
        fill="white"
      />
      <Path
        d="M627.315 175.024C625.138 168.787 621.973 163.318 617.907 158.769C609.95 149.878 598.897 144.981 586.753 144.981C579.368 144.981 572.784 146.533 567.178 149.591C563.251 151.753 559.758 154.618 556.872 158.044V147.614H539.743V277.912H556.872V234.766C559.655 238.407 563.163 241.434 567.176 243.656C572.648 246.674 579.24 248.203 586.753 248.203C598.897 248.203 609.96 243.305 617.907 234.415C621.973 229.866 625.138 224.397 627.315 218.16C629.592 211.641 630.747 204.382 630.747 196.593C630.747 188.804 629.592 181.545 627.315 175.024ZM606.338 221.764C601.128 229.107 593.702 232.991 584.869 232.991C576.462 232.991 569.406 229.584 564.46 223.142C559.513 216.7 556.872 207.497 556.872 196.593C556.872 185.689 559.495 176.504 564.46 170.042C569.424 163.579 576.462 160.193 584.869 160.193C593.702 160.193 601.128 164.076 606.338 171.42C611.033 178.036 613.618 186.975 613.618 196.593C613.618 206.211 611.033 215.158 606.338 221.764Z"
        fill="white"
      />
      <Path
        d="M688.071 144.976C673.869 144.976 661.984 149.691 653.703 158.61C645.309 167.646 640.869 180.779 640.869 196.588C640.869 211.774 645.286 224.661 653.644 233.851C662.179 243.236 674.341 248.195 688.81 248.195C700.361 248.195 710.159 244.96 717.896 238.582C724.747 232.934 729.76 224.878 732.391 215.273L732.745 213.977H715.529L715.329 214.746C714.106 219.175 711.62 223.155 708.173 226.2C703.134 230.693 696.429 232.97 688.246 232.97C678.818 232.97 670.968 229.55 665.547 223.088C660.862 217.504 658.2 209.889 658 201.544H733.944V200.52C733.944 183.017 730.127 169.334 722.601 159.852C714.767 149.991 703.141 144.976 688.071 144.976ZM658.023 186.347C658.28 179.452 661.255 173.054 666.44 168.236C672.02 163.046 679.703 160.188 688.071 160.188C692.142 160.152 696.183 160.888 699.979 162.355C703.36 163.676 706.436 165.669 709.022 168.213C713.817 172.956 716.559 179.362 716.802 186.347H658.023Z"
        fill="white"
      />
      <Path
        d="M826.472 162.99C824.881 159.075 822.403 155.581 819.23 152.783C813.414 147.678 805.336 144.981 795.872 144.981C788.233 144.981 781.323 146.538 775.337 149.607C771.367 151.617 767.815 154.358 764.867 157.685V147.614H747.735V245.569H764.867V184.744C764.839 181.359 765.502 178.004 766.815 174.883C768.073 171.941 769.946 169.301 772.308 167.14C777.262 162.596 784.116 160.193 792.109 160.193C798.903 160.193 804.06 162.242 807.433 166.266C810.421 169.837 812 175.054 812 181.36V245.569H829.128V177.598C829.118 172.152 828.227 167.237 826.472 162.99Z"
        fill="white"
      />
      <Path
        d="M123.849 109.062H122.823V110.087V244.545V245.569H123.849H138.927H139.954V244.545V110.087V109.062H138.927H123.849Z"
        fill="white"
      />
      <Path
        d="M200.927 144.976C186.725 144.976 174.84 149.691 166.557 158.61C158.165 167.646 153.722 180.779 153.722 196.588C153.722 211.774 158.14 224.661 166.498 233.851C175.032 243.236 187.197 248.195 201.664 248.195C213.215 248.195 223.013 244.96 230.752 238.582C237.603 232.934 242.616 224.878 245.247 215.273L245.601 213.977H228.383L228.185 214.746C226.962 219.175 224.476 223.155 221.029 226.2C215.99 230.693 209.282 232.97 201.099 232.97C191.674 232.97 183.824 229.55 178.4 223.088C173.718 217.504 171.056 209.889 170.856 201.544H246.79V200.52C246.79 183.017 242.975 169.334 235.449 159.852C227.623 149.991 216.003 144.976 200.927 144.976ZM170.879 186.347C171.136 179.452 174.111 173.054 179.294 168.236C184.876 163.046 192.559 160.188 200.927 160.188C204.997 160.152 209.037 160.888 212.832 162.355C216.214 163.675 219.29 165.668 221.876 168.213C226.673 172.956 229.415 179.362 229.658 186.347H170.879Z"
        fill="white"
      />
      <Path
        d="M346.891 232.609C340.866 232.609 339.85 229.62 339.85 222.919V176.281C339.85 165.234 336.184 156.945 328.948 151.643C322.916 147.222 314.573 144.983 304.149 144.983C290.686 144.983 280.277 148.188 273.193 154.507C269.917 157.442 267.34 161.07 265.648 165.126C264.003 169.027 263.041 173.458 262.794 178.302L262.738 179.378H279.861L279.926 178.422C280.4 171.42 282.166 167.078 285.657 164.35C289.284 161.517 295.155 160.195 304.154 160.195C311.039 160.195 316.062 161.504 319.081 164.086C321.532 166.187 322.726 169.13 322.726 173.087C322.726 181.716 316.496 183.689 300.009 186.75C287.074 189.193 276.981 191.798 269.761 196.562C265.872 199.124 263.046 202.174 261.123 205.876C259.07 209.805 258.086 214.397 258.086 219.912C258.086 228.216 261.167 235.28 266.988 240.383C272.81 245.485 281.07 248.205 290.773 248.205C305.309 248.205 316.488 243.469 323.234 234.486C324.584 238.905 326.548 241.889 329.346 243.795C332.1 245.675 335.666 246.512 340.897 246.512C343.946 246.512 346.097 246.279 350.079 244.955L350.782 244.722V232.301L349.634 232.435C348.724 232.546 347.808 232.604 346.891 232.609ZM322.721 207.507C322.721 215.96 319.82 222.468 314.098 226.864C308.875 230.875 301.328 232.998 292.28 232.998C286.463 232.998 282.074 231.766 279.24 229.341C276.571 227.058 275.215 223.634 275.215 219.167C275.215 213.808 277.135 210.094 281.44 207.128C285.47 204.346 291.728 202.164 301.718 200.046C312.076 197.94 319.117 195.768 322.716 193.573L322.721 207.507Z"
        fill="white"
      />
      <Path
        d="M413.725 145.503C410.869 145.133 407.989 144.961 405.108 144.991C398.396 144.991 392.603 147.127 387.887 151.341C384.55 154.327 381.683 158.359 379.188 163.602V147.614H362.057V245.57H379.201V193.386C379.201 184.593 381.994 176.64 387.068 170.997C389.561 168.212 392.625 165.995 396.052 164.496C399.736 162.91 403.71 162.109 407.722 162.145C409.64 162.149 411.555 162.308 413.448 162.618L414.639 162.811V145.616L413.725 145.503Z"
        fill="white"
      />
      <Path
        d="M932.876 109.062H916.774V158.42C913.991 154.799 910.504 151.775 906.522 149.53C901.098 146.512 894.622 144.981 887.271 144.981C874.962 144.981 863.783 149.878 855.788 158.766C847.355 168.143 842.899 181.225 842.899 196.593C842.899 211.961 847.355 225.04 855.788 234.417C863.783 243.305 874.962 248.203 887.271 248.203C894.489 248.203 900.965 246.648 906.522 243.592C910.427 241.42 913.902 238.556 916.777 235.14V245.582H933.903V109.062H932.876ZM909.197 223.142C904.25 229.584 897.192 232.991 888.785 232.991C879.952 232.991 872.526 229.107 867.315 221.764C862.623 215.148 860.036 206.209 860.036 196.593C860.036 186.977 862.623 178.036 867.315 171.419C872.526 164.076 879.952 160.193 888.785 160.193C897.192 160.193 904.25 163.6 909.197 170.041C914.143 176.483 916.782 185.687 916.782 196.593C916.782 207.499 914.138 216.68 909.184 223.142H909.197Z"
        fill="white"
      />
      <Path
        d="M296.224 335.892V353.776H326.671V358.727H290.09V309.583H326.449V314.534H296.224V331.014H324.232V335.892H296.224Z"
        fill="white"
      />
      <Path
        d="M348.981 353.554L361.47 321.777H367.308L352.75 358.727H344.917L330.358 321.777H336.566L348.981 353.554Z"
        fill="white"
      />
      <Path
        d="M388.856 355.401C395.36 355.401 399.252 352.716 400.533 347.346H405.927C405.484 350.746 403.883 353.702 401.124 356.214C398.365 358.678 394.202 359.909 388.635 359.909C382.575 359.909 377.993 358.111 374.889 354.515C371.834 350.869 370.307 346.09 370.307 340.178C370.307 336.434 370.997 333.083 372.376 330.127C373.756 327.171 375.825 324.856 378.584 323.181C381.343 321.456 384.693 320.594 388.635 320.594C392.231 320.594 395.335 321.382 397.946 322.959C400.606 324.486 402.602 326.654 403.932 329.462C405.311 332.221 406.001 335.399 406.001 338.995C406.001 340.129 405.952 340.991 405.853 341.582H376.145C376.342 346.459 377.525 349.982 379.693 352.15C381.91 354.318 384.964 355.401 388.856 355.401ZM388.708 325.102C385.063 325.102 382.181 326.063 380.062 327.984C377.944 329.906 376.687 332.96 376.293 337.148H400.237C399.941 329.117 396.099 325.102 388.708 325.102Z"
        fill="white"
      />
      <Path
        d="M434.346 321.259V327.097H432.794C427.719 326.95 424.221 328.452 422.3 331.605C420.428 334.759 419.492 339.266 419.492 345.129V358.727H413.58V321.777H419.492V331.532C420.674 328.329 422.374 325.817 424.591 323.994C426.857 322.171 429.665 321.259 433.015 321.259H434.346Z"
        fill="white"
      />
      <Path
        d="M469.517 321.777H475.355L457.989 364.861C457.102 367.127 456.289 368.827 455.55 369.96C454.86 371.142 453.899 372.029 452.668 372.62C451.436 373.211 449.736 373.507 447.569 373.507H440.548V368.704H450.82L454.885 358.727H452.816L438.183 321.777H444.391L455.698 350.228L456.954 353.776L458.063 350.228L469.517 321.777Z"
        fill="white"
      />
      <Path
        d="M528.288 306.996H534.2V358.727H528.288V351.632C527.007 354.293 525.185 356.338 522.82 357.766C520.504 359.195 517.671 359.909 514.321 359.909C508.754 359.909 504.542 358.111 501.684 354.515C498.827 350.918 497.398 346.164 497.398 340.252C497.398 334.29 498.827 329.536 501.684 325.989C504.542 322.392 508.754 320.594 514.321 320.594C517.671 320.594 520.504 321.309 522.82 322.737C525.185 324.117 527.007 326.137 528.288 328.797V306.996ZM515.504 355.106C519.543 355.106 522.672 353.899 524.889 351.485C527.155 349.071 528.288 345.326 528.288 340.252C528.288 335.177 527.155 331.433 524.889 329.019C522.672 326.605 519.543 325.398 515.504 325.398C511.316 325.398 508.237 326.629 506.266 329.093C504.345 331.507 503.384 335.227 503.384 340.252C503.384 345.277 504.345 349.021 506.266 351.485C508.237 353.899 511.316 355.106 515.504 355.106Z"
        fill="white"
      />
      <Path
        d="M560.403 359.909C556.363 359.909 552.939 359.072 550.131 357.397C547.372 355.672 545.278 353.332 543.849 350.376C542.47 347.371 541.78 343.971 541.78 340.178C541.78 336.434 542.47 333.083 543.849 330.127C545.278 327.171 547.372 324.856 550.131 323.181C552.939 321.456 556.363 320.594 560.403 320.594C564.393 320.594 567.768 321.456 570.527 323.181C573.335 324.856 575.429 327.171 576.809 330.127C578.238 333.083 578.952 336.434 578.952 340.178C578.952 343.971 578.238 347.346 576.809 350.302C575.429 353.258 573.335 355.598 570.527 357.323C567.768 359.047 564.393 359.909 560.403 359.909ZM547.766 340.252C547.766 345.376 548.8 349.145 550.87 351.559C552.988 353.923 556.166 355.106 560.403 355.106C564.64 355.106 567.793 353.923 569.862 351.559C571.931 349.145 572.966 345.376 572.966 340.252C572.966 335.128 571.931 331.384 569.862 329.019C567.793 326.605 564.64 325.398 560.403 325.398C556.166 325.398 552.988 326.605 550.87 329.019C548.8 331.384 547.766 335.128 547.766 340.252Z"
        fill="white"
      />
      <Path d="M593.055 358.727H587.143V306.996H593.055V358.727Z" fill="white" />
      <Path d="M609.582 358.727H603.67V306.996H609.582V358.727Z" fill="white" />
      <Path
        d="M630.706 359.688C627.06 359.688 624.104 358.752 621.838 356.879C619.621 355.007 618.512 352.372 618.512 348.972C618.512 345.918 619.399 343.479 621.173 341.656C622.996 339.784 625.853 338.527 629.745 337.887L639.131 336.335C641.151 335.99 642.579 335.498 643.417 334.857C644.254 334.217 644.673 333.207 644.673 331.827C644.673 329.758 643.984 328.132 642.604 326.95C641.274 325.767 638.934 325.176 635.583 325.176C629.129 325.176 625.681 327.91 625.237 333.379H619.399C619.498 329.388 620.927 326.26 623.685 323.994C626.444 321.678 630.337 320.52 635.362 320.52C640.239 320.52 643.91 321.555 646.373 323.624C648.836 325.644 650.068 328.378 650.068 331.827V349.563C650.068 352.766 650.216 355.82 650.511 358.727H645.117C644.772 355.032 644.599 352.15 644.599 350.081C643.762 352.741 642.21 355.007 639.944 356.879C637.677 358.752 634.598 359.688 630.706 359.688ZM631.888 355.032C634.647 355.032 636.988 354.391 638.909 353.111C640.83 351.83 642.259 350.13 643.195 348.011C644.181 345.893 644.673 343.627 644.673 341.212V338.035C643.786 338.675 642.826 339.168 641.791 339.513C640.806 339.858 639.549 340.203 638.022 340.547L631.888 341.804C629.327 342.346 627.454 343.159 626.272 344.242C625.09 345.277 624.498 346.78 624.498 348.75C624.498 350.82 625.163 352.396 626.494 353.48C627.824 354.515 629.622 355.032 631.888 355.032Z"
        fill="white"
      />
      <Path
        d="M680.585 321.259V327.097H679.033C673.959 326.95 670.461 328.452 668.539 331.605C666.667 334.759 665.731 339.266 665.731 345.129V358.727H659.819V321.777H665.731V331.532C666.913 328.329 668.613 325.817 670.83 323.994C673.096 322.171 675.905 321.259 679.255 321.259H680.585Z"
        fill="white"
      />
      <Path
        d="M703.005 340.252C703.005 336.458 703.719 333.083 705.148 330.127C706.576 327.122 708.67 324.782 711.429 323.107C714.237 321.432 717.588 320.594 721.48 320.594C726.85 320.594 730.988 321.924 733.895 324.585C736.802 327.245 738.403 330.817 738.699 335.3H733.156C732.713 332.197 731.53 329.783 729.609 328.058C727.687 326.285 725.052 325.398 721.701 325.398C713.227 325.398 708.991 330.349 708.991 340.252C708.991 345.425 710.05 349.194 712.168 351.559C714.336 353.923 717.44 355.106 721.48 355.106C725.076 355.106 727.884 354.17 729.904 352.298C731.924 350.425 733.131 347.864 733.526 344.612H739.142C738.994 347.519 738.206 350.13 736.777 352.445C735.398 354.761 733.402 356.584 730.791 357.914C728.229 359.244 725.126 359.909 721.48 359.909C717.538 359.909 714.164 359.072 711.355 357.397C708.596 355.722 706.503 353.406 705.074 350.45C703.694 347.494 703.005 344.095 703.005 340.252Z"
        fill="white"
      />
      <Path
        d="M763.558 359.909C759.518 359.909 756.094 359.072 753.285 357.397C750.526 355.672 748.433 353.332 747.004 350.376C745.624 347.371 744.935 343.971 744.935 340.178C744.935 336.434 745.624 333.083 747.004 330.127C748.433 327.171 750.526 324.856 753.285 323.181C756.094 321.456 759.518 320.594 763.558 320.594C767.548 320.594 770.923 321.456 773.682 323.181C776.49 324.856 778.584 327.171 779.963 330.127C781.392 333.083 782.107 336.434 782.107 340.178C782.107 343.971 781.392 347.346 779.963 350.302C778.584 353.258 776.49 355.598 773.682 357.323C770.923 359.047 767.548 359.909 763.558 359.909ZM750.92 340.252C750.92 345.376 751.955 349.145 754.024 351.559C756.143 353.923 759.321 355.106 763.558 355.106C767.794 355.106 770.948 353.923 773.017 351.559C775.086 349.145 776.121 345.376 776.121 340.252C776.121 335.128 775.086 331.384 773.017 329.019C770.948 326.605 767.794 325.398 763.558 325.398C759.321 325.398 756.143 326.605 754.024 329.019C751.955 331.384 750.92 335.128 750.92 340.252Z"
        fill="white"
      />
      <Path
        d="M816.974 321.777H822.886V358.727H816.974V349.342C814.61 356.387 810.028 359.909 803.229 359.909C798.598 359.909 795.174 358.702 792.957 356.288C790.789 353.874 789.705 350.228 789.705 345.351V321.777H795.617V344.686C795.617 348.578 796.405 351.288 797.982 352.815C799.559 354.293 801.874 355.032 804.929 355.032C808.771 355.032 811.727 353.381 813.797 350.081C815.915 346.73 816.974 342.001 816.974 335.892V321.777Z"
        fill="white"
      />
      <Path
        d="M853.052 320.594C857.585 320.594 860.91 321.801 863.029 324.215C865.147 326.629 866.207 330.275 866.207 335.153V358.727H860.295V335.818C860.295 332.073 859.531 329.438 858.004 327.91C856.526 326.334 854.333 325.546 851.427 325.546C847.288 325.546 844.16 327.147 842.041 330.349C839.923 333.551 838.863 338.306 838.863 344.612V358.727H832.951V321.777H838.863V331.458C840.046 328.009 841.819 325.348 844.184 323.476C846.549 321.555 849.505 320.594 853.052 320.594Z"
        fill="white"
      />
      <Path
        d="M887.577 358.727C884.177 358.727 881.837 358.062 880.556 356.732C879.275 355.401 878.635 353.184 878.635 350.081V326.432H871.614V323.107L879.152 321.259L881.369 313.574H884.547V321.777H896.74V326.432H884.547V353.923H896.297V358.727H887.577Z"
        fill="white"
      />
      <Path
        d="M906.847 346.386C907.389 352.396 911.306 355.401 918.598 355.401C921.751 355.401 924.042 354.859 925.47 353.776C926.948 352.692 927.687 351.091 927.687 348.972C927.687 347.198 927.146 345.819 926.062 344.834C924.978 343.848 923.278 343.183 920.962 342.838L912.39 341.582C909.138 341.139 906.65 340.079 904.926 338.404C903.202 336.68 902.34 334.414 902.34 331.605C902.34 328.157 903.645 325.447 906.256 323.476C908.867 321.506 912.489 320.52 917.12 320.52C921.849 320.52 925.569 321.604 928.279 323.772C931.038 325.94 932.54 328.797 932.787 332.344H926.948C926.751 330.226 925.84 328.477 924.214 327.097C922.588 325.718 920.174 325.028 916.972 325.028C913.967 325.028 911.725 325.57 910.247 326.654C908.818 327.738 908.104 329.241 908.104 331.162C908.104 334.217 910.099 336.039 914.09 336.631L921.923 337.739C926.062 338.33 929.018 339.537 930.791 341.36C932.614 343.134 933.526 345.573 933.526 348.676C933.526 352.421 932.245 355.229 929.683 357.101C927.121 358.973 923.377 359.909 918.45 359.909C912.686 359.909 908.424 358.702 905.665 356.288C902.906 353.825 901.477 350.524 901.379 346.386H906.847Z"
        fill="white"
      />
    </Svg>
  </View>
);