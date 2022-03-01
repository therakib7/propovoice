<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head> 
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
  
   <style type="text/css"> 
      .ncpi {
         margin: 0;
         padding: 0;
         -webkit-text-size-adjust: 100%;
         background-color: #ededed; 
         /* TODO: change font family */
         font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
      }
      .ncpi-container {
         width: 600px;
         margin: 40px auto;
         background-color: #fff; 
         border-radius: 4px;
      }
      .ncpi-container .ncpi-header {
         padding: 30px;
         text-align: center;
         border-bottom: 3px solid #4C6FFF;
      }
      .ncpi-container .ncpi-header span { 
         color: #1e1d1d;
         font-size: 24px;
         line-height: 24px;
         font-weight: 600;
      }
      .ncpi-container .ncpi-content {
         padding: 20px 40px; 
      }
      .ncpi-container .ncpi-content p {
         line-height: 26px;
      }
      .ncpi-container .ncpi-content .ncpi-btn {
         padding: 15px 20px;
         font-weight: 600;
         border-radius: 8px;
         color: #fff;
         background-color: #4C6FFF;
         cursor: pointer; 
         font-size: 14px;
         text-decoration: none;
         display: inline-block;
         margin: 20px auto;
      }

      @media (max-width: 520px) { 
         .ncpi-container {
            width: 100%;
            margin: 40px auto; 
         }
      } 
   </style> 
</head> 
<body class="ncpi">
   <div class="ncpi-container">
      <div class="ncpi-header">
         <span>{company_name}</span>
      </div>

      <div class="ncpi-content">
         <p>
            Hello <strong>{client_name},</strong><br>
            {company_name}. has sent you an Invoice <strong>#INV{invoice_id}</strong>. <br>
            Click the button below to view the Invoice.<br>
         </p>
         <div style="text-align: center;">
            <a href="{invoice_url}" target="_blank" class="ncpi-btn">View Invoice</a>
         </div>
      </div>

      <div class="ncpi-footer"> 
      </div>

   </div>
</body> 
</html>
