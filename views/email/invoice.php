<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head> 
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"> 
  
   <style type="text/css">  
      .ncpi {
         padding: 40px 0;
         margin: 0;
         -webkit-text-size-adjust: 100%;
         background-color: #ededed; 
         font-family: 'Inter', sans-serif;
      }

      .ncpi-container {
         margin: auto;
         width: 600px;
         background-color:#fff; 
         border-radius: 4px;
      }
      .ncpi-shape  {
         display: flex;
         height: 154px;
         background-image: url(https://appux.co/wp-content/plugins/propovoice-server/assets/email/shape1.png);
         /* filter: invert(38%) sepia(24%) saturate(6729%) hue-rotate(223deg) brightness(98%) contrast(94%); */
      }
      .ncpi-container .ncpi-header {
         padding: 40px 55px;
         position: relative; 
          z-index: 111;
      }
      .ncpi-container .ncpi-header span { 
         color:#fff;
         font-size: 24px;
         line-height: 24px;
         font-weight: 600;
      }
      .ncpi-container .ncpi-content {
         /* margin-top: 100px; */
         padding: 0px 55px; 
      }
      .ncpi-container .ncpi-content p {
         line-height: 140%;
         color:#4A5568 ;
         font-size: 16px;
      }
      .ncpi-container .ncpi-content .ncpi-btn {
         padding: 15px 20px;
         font-weight: 600;
         border-radius: 8px;
         color: #fff;
         background-color: #5865F2;
         cursor: pointer; 
         font-size: 14px;
         text-decoration: none;
         display: inline-block;
         margin: 40px auto;
      }
      .ncpi-container .ncpi-footer {
         text-align: center;
      }
      .ncpi-container  hr {
         margin-bottom: 40px;
         border-top: 1px solid #E2E8F0;
      }
      .ncpi-container .ncpi-footer span {
         color:#5865F2;
         font-size: 24px;
         line-height: 24px;
         font-weight: 600;
      }
      .ncpi-container .ncpi-footer p {
         color: #4A5568;
         margin-top: 18px;
         margin-bottom: 12px;
         font-size: 16px;
      }
      .ncpi-container .ncpi-footer .ncpi-social a {
          text-decoration: none;
      }
      .ncpi-container .ncpi-footer .ncpi-social a img {
         margin: 0  5px;
         margin-bottom: 30px;
      }
      .ncpi-footer .ncpi-footer-shape {
         height: 60px;
         background-image: url(https://appux.co/wp-content/plugins/propovoice-server/assets/email/shape2.png);
         /* filter: invert(10%) sepia(10%) saturate(212%) hue-rotate(128deg) brightness(100%) contrast(112%);
         */
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
         <div class="ncpi-header">
            <span>Propovoice</span>
        </div>
      </div>
      <div class="ncpi-content">
         <p>{msg}</p>
         <div style="text-align: center;">
               <a href="{url}" target="_blank" class="ncpi-btn">View {path}</a>
         </div>
         <hr>
      </div>

      <div class="ncpi-footer"> 
         <span>Propovoice</span>
         <p>Follow on</p>
         <!-- TODO: social link dynamic -->
         <div class="ncpi-social">
            {social}  
         </div>
         <div class="ncpi-footer-shape"></div>
      </div> 
   </div>
</body> 
</html>
