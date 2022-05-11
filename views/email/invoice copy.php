<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
   <style type="text/css">
      :root {
         --ncpi-primary: #5865F2;
         --ncpi-secondary: #4A5568;
         --ncpi-white: #fff;
      }

      .ncpi {
         margin: 0;
         padding: 0;
         -webkit-text-size-adjust: 100%;
         background-color: #ededed;
         font-family: 'Inter', sans-serif;
      }

      .ncpi-container {
         position: relative;
         width: 600px;
         margin: 40px auto;
         background-color: var(--ncpi-white);
         border-radius: 4px;
      }

      .ncpi-container .ncpi-shape svg {
         fill: var(--ncpi-primary);
      }

      .ncpi-container .ncpi-header {
         position: absolute;
         margin-top: -120px;
         padding-left: 55px;
      }

      .ncpi-container .ncpi-header span {
         color: var(--ncpi-white);
         font-size: 24px;
         line-height: 24px;
         font-weight: 600;
      }

      .ncpi-container .ncpi-content {
         margin-top: 10px;
         padding: 0px 55px;
      }

      .ncpi-container .ncpi-content p {
         line-height: 140%;
         color: var(--ncpi-secondary);
      }

      .ncpi-container .ncpi-content .ncpi-btn {
         padding: 15px 20px;
         font-weight: 600;
         border-radius: 8px;
         color: #fff;
         background-color: var(--ncpi-primary);
         cursor: pointer;
         font-size: 14px;
         text-decoration: none;
         display: inline-block;
         margin: 40px auto;
      }

      .ncpi-container .ncpi-footer {
         text-align: center;
      }

      .ncpi-container hr {
         margin-bottom: 40px;
         border-top: 1px solid #E2E8F0;
      }

      .ncpi-container .ncpi-footer span {
         color: var(--ncpi-primary);
         font-size: 24px;
         line-height: 24px;
         font-weight: 600;
      }

      .ncpi-container .ncpi-footer p {
         color: var(--ncpi-secondary);
         margin-top: 18px;
         margin-bottom: 12px;
      }

      .ncpi-container .ncpi-footer .ncpi-social a {
         text-decoration: none;
      }

      .ncpi-container .ncpi-footer .ncpi-social a svg {
         margin: 0 5px;
         margin-bottom: 30px;
      }

      .ncpi-container .ncpi-footer svg {
         fill: var(--ncpi-primary);
         margin-bottom: -4px;
      }

      @media (max-width: 520px) {
         .ncpi-container {
            width: 100%;
            margin: 40px auto;
         }
      }

      @media (max-width: 500px) {
         .ncpi-container .ncpi-header {
            margin-top: -90px;
            padding-left: 40px;
         }

         .ncpi-container .ncpi-header span {
            font-size: 18px;
         }
      }
   </style>
</head>

<body class="ncpi">
   <div class="ncpi-container">
      <div class="ncpi-shape">
         <svg viewBox="0 0 600 154" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M600 0H0V39V154L20 140.667C40 127.333 80 100.667 120 100.667C139.205 100.667 158.41 106.814 177.614 112.961C198.41 119.617 219.205 126.273 240 125.125C261.683 123.838 283.365 114.188 305.048 104.539C323.365 96.387 341.683 88.2352 360 85.125C389.59 80.2859 419.18 88.6028 448.769 96.9197C459.18 99.8458 469.59 102.772 480 105.125C520 114 560 114 580 114H600V39V34.0001V0Z" />
         </svg>
      </div>
      <div class="ncpi-header">
         <span>Propovoice</span>
      </div>
      <div class="ncpi-content">
         <p>{msg}</p>
         <div style="text-align: center;">
            <a href="{invoice_url}" target="_blank" class="ncpi-btn">View Invoice</a>
         </div>
         <hr>
      </div>
      <div class="ncpi-footer">
         <span>Propovoice</span>
         <p>Follow on</p>
         <div class="ncpi-social">
            <a href='#'>
               <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 9.55885C19 4.27818 14.7446 0 9.5 0C4.25184 0 0 4.27818 0 9.55885C0 14.3287 3.47284 18.2837 8.01562 19V12.3225H5.60322V9.55944H8.01562V7.45232C8.01562 5.05723 9.43172 3.73452 11.6025 3.73452C12.6421 3.73452 13.7305 3.92092 13.7305 3.92092V6.27299H12.5305C11.3525 6.27299 10.9844 7.01082 10.9844 7.76656V9.55885H13.6188L13.1955 12.322H10.9844V18.9994C15.5236 18.2831 19 14.3281 19 9.55825V9.55885Z" fill="#0A66C2" />
               </svg>
            </a>
            <a href='#'>
               <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 1.89404C20.2136 2.22064 19.3795 2.43503 18.5254 2.53006C19.4151 2.03017 20.0981 1.23857 20.4198 0.295396C19.5741 0.765896 18.6488 1.09739 17.684 1.27556C16.898 0.490584 15.7784 0 14.5391 0C12.1597 0 10.2306 1.80852 10.2306 4.03911C10.2306 4.35573 10.2688 4.66397 10.3422 4.95967C6.76151 4.79117 3.5869 3.18314 1.46188 0.739375C1.0911 1.33594 0.878637 2.02986 0.878637 2.77C0.878637 4.17139 1.63931 5.40765 2.7953 6.13203C2.11111 6.11194 1.44199 5.93869 0.843773 5.62676C0.843527 5.64368 0.843527 5.66059 0.843527 5.67759C0.843527 7.63462 2.32862 9.26718 4.2995 9.63825C3.66506 9.80002 2.99958 9.82369 2.35389 9.70747C2.9021 11.3122 4.49326 12.4799 6.3785 12.5126C4.90399 13.5959 3.04623 14.2417 1.02777 14.2417C0.679957 14.2417 0.337066 14.2225 0 14.1852C1.90665 15.3313 4.17129 16 6.60434 16C14.5291 16 18.8626 9.84513 18.8626 4.50754C18.8626 4.33235 18.8585 4.15816 18.8501 3.98497C19.6936 3.41331 20.4216 2.70526 21 1.89404Z" fill="#55ACEE" />
               </svg>
            </a>
            <a href='#'>
               <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.6328 13.633H11.2621V9.92029C11.2621 9.03497 11.2463 7.89529 10.0291 7.89529C8.79431 7.89529 8.60538 8.85991 8.60538 9.85585V13.6327H6.23475V5.99798H8.51056V7.04135H8.54244C8.77019 6.65191 9.09931 6.33154 9.49474 6.11436C9.89017 5.89717 10.3371 5.79131 10.7879 5.80804C13.1908 5.80804 13.6338 7.38854 13.6338 9.44466L13.6328 13.633ZM3.55975 4.95441C2.79994 4.95454 2.18387 4.33866 2.18375 3.57885C2.18362 2.81904 2.79944 2.20298 3.55925 2.20285C4.31906 2.20266 4.93512 2.81854 4.93525 3.57835C4.93532 3.94323 4.79044 4.29319 4.53248 4.55125C4.27453 4.80931 3.92463 4.95433 3.55975 4.95441ZM4.74512 13.633H2.37194V5.99798H4.74506V13.633L4.74512 13.633ZM14.8146 0.00116449H1.18069C0.536312 -0.0060855 0.007875 0.510102 0 1.15448V14.8453C0.007625 15.49 0.536 16.0067 1.18062 15.9999H14.8146C15.4606 16.0079 15.9911 15.4912 16 14.8453V1.15341C15.9908 0.507789 15.4603 -0.0083355 14.8146 0.000101993" fill="#0A66C2" />
               </svg>
            </a>
         </div>
         <svg viewBox="0 0 600 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 20.1137L25 22.3158C50 24.684 100 28.8389 150 22.3158C200 15.5434 250 -1.90681 300 0.170603C350 2.24801 400 24.684 450 28.9635C500 33.4092 550 20.1137 575 13.466L600 6.81831V60H575C550 60 500 60 450 60C400 60 350 60 300 60C250 60 200 60 150 60C100 60 50 60 25 60H0V20.1137Z" />
         </svg>
      </div>
   </div>
</body>

</html>