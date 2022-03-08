<?php
/*
 * Template Name: Propovoice Invoice
 * Description: Template for Single Invoice
 */  
?>
<?php 
ob_start();
?>  
<style>  
element  {
  --pi-inv-primary: #0099FF;
  --pi-inv-secondary: #4C6FFF;
  --pi-inv-text-primary:#000000;
  --pi-inv-text-secondary:#1A202C;
  --pi-inv-text-3th:#2D3748;
  --pi-inv-text-4th:#31343D;
  --pi-inv-text-5th:#4A5568;
  --pi-inv-white:#fff;
  --pi-inv-medium: 16px;
  --pi-inv-small: 12px;
}

.pi-inv-wrapper {
  background-color: #E5E5E5;
}
.pi-inv-wrapper a {
  text-decoration: none;
  color: inherit;
}
.pi-inv-wrapper * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.pi-inv {
  max-width: 794px;
  margin: 0 auto;
  background-color: #fff;
  /* ==== invoece to address */
  /* pi-banking wrap */
  /* pi-note wrap */
}
.pi-inv .pi-bg-one {
  background-color: #8EB538;
}
.pi-inv .pi-bg-two {
  background-color: #424449;
}
.pi-inv .pi-bg-4th {
  background-color: var(--pi-inv-text-4th);
}
.pi-inv .pi-hedear {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
.pi-inv .pi-from address {
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: var(--pi-inv-small);
  line-height: 200%;
  color: var(--pi-inv-text-4th);
  margin-bottom: 36px;
  margin-top: 18px;
}
.pi-inv .pi-from address span, .pi-inv .pi-from address a {
  font-weight: 500;
}
.pi-inv .pi-from-date p {
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: var(--pi-inv-small);
  line-height: 200%;
}
.pi-inv .pi-from-date p span {
  font-weight: 400;
}
.pi-inv .pi-from-time {
  display: flex;
  -moz-column-gap: 18px;
       column-gap: 18px;
}
.pi-inv .pi-inv-title h2 {
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  line-height: 100%;
  color: var(--pi-inv-text-4th);
  margin-bottom: 18px;
  text-transform: uppercase;
}
.pi-inv .pi-to p {
  font-style: normal;
  font-weight: 500;
  font-size: var(--pi-inv-small);
  line-height: 200%;
  color: var(--pi-inv-text-3th);
  font-family: Inter;
  letter-spacing: 0.07px;
}
.pi-inv .pi-to h6 {
  font-style: normal;
  font-weight: bold;
  font-size: var(--pi-inv-small);
  line-height: 200%;
  color: var(--pi-inv-text-3th);
  font-family: Inter;
  letter-spacing: 0.07px;
}
.pi-inv .pi-to address {
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: var(--pi-inv-small);
  line-height: 200%;
  color: var(--pi-inv-text-3th);
  margin-bottom: 36px;
  margin-top: 5px;
}
.pi-inv .pi-to address p, .pi-inv .pi-to address a, .pi-inv .pi-to address span {
  font-weight: 400;
  margin-top: -5px;
}
.pi-inv .pi-items-table table {
  border-spacing: 0;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 24px;
}
.pi-inv .pi-items-table table thead th {
  padding: 10px;
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: var(--pi-inv-small);
  line-height: 140%;
  text-align: left;
}
.pi-inv .pi-items-table table td {
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: var(--pi-inv-small);
  line-height: 150%;
  padding: 15px 10px;
  color: var(--pi-inv-text-3th);
}
.pi-inv .pi-items-table table td span {
  color: var(--pi-inv-text-5th);
  font-weight: 400;
}
.pi-inv .pi-bank-info {
  margin-bottom: 35px;
}
.pi-inv .pi-bank-info {
  display: flex;
  justify-content: space-between;
  -moz-column-gap: 30px;
       column-gap: 30px;
}
.pi-inv .pi-bank-info h4 {
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: var(--pi-inv-medium);
  line-height: 140%;
  color: #1A202C;
}
.pi-inv .pi-bank-info table {
  margin-top: 18px;
}
.pi-inv .pi-bank-info table th {
  text-align: left;
  padding-right: 20px;
  padding-left: 0;
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: var(--pi-inv-small);
  line-height: 150%;
  color: var(--pi-inv-text-primary);
  padding-bottom: 4px;
}
.pi-inv .pi-bank-info table td {
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: var(--pi-inv-small);
  line-height: 150%;
  color: var(--pi-inv-text-primary);
  text-align: left;
  padding-bottom: 4px;
}
.pi-inv .pi-amounting table {
  border-spacing: 0;
  width: 210px;
}
.pi-inv .pi-amounting table tr.pi-before-total th {
  padding-bottom: 10px;
}
.pi-inv .pi-amounting table th {
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: var(--pi-inv-medium);
  line-height: 140%;
  color: var(--pi-inv-text-primary);
  padding-left: 28px;
}
.pi-inv .pi-amounting .pi-table-bg th {
  color: var(--pi-inv-white);
  padding: 6px;
  padding-left: 28px;
  padding-right: 10px;
}
.pi-inv .pi-amounting .pi-table-bg td {
  color: var(--pi-inv-white);
  line-height: 140%;
}
.pi-inv .pi-note-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.pi-inv .pi-terms h4 {
  margin-top: 15px;
  font-style: normal;
  font-weight: bold;
  font-size: var(--pi-inv-medium);
  line-height: 200%;
  color: var(--pi-inv-text-secondary);
}
.pi-inv .pi-terms ul {
  list-style-type: dot;
}
.pi-inv .pi-terms ul li {
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: var(--pi-inv-small);
  line-height: 150%;
  color: var(--pi-inv-text-5th);
  margin-left: 15px;
}
.pi-inv .mt-35 {
  margin-top: 35px;
}
.pi-inv .pi-note h4 {
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: var(--pi-inv-medium);
  line-height: 150%;
  color: var(--pi-inv-text-secondary);
}
.pi-inv .pi-note p {
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: var(--pi-inv-small);
  line-height: 200%;
  color: var(--pi-inv-text-5th);
}
.pi-inv .pi-sign {
  text-align: center;
  margin-right: 60px;
}
.pi-inv .pi-sign h4 {
  font-style: normal;
  font-weight: bold;
  font-size: var(--pi-inv-medium);
  line-height: 200%;
  color: var(--pi-inv-text-secondary);
}
.pi-inv .pi-border {
  border: 0.5px solid #A0AEC0;
  margin: 0 -30px;
  margin-top: 8px;
}

</style>
<div class="pi-inv">
            <div class="pi-hedear">
                <div class="pi-from">
                    <address>
                        Address: <span>377 Airport - Dakshinkhan Rd, Dhaka 1230</span><br> 
                        Email: <span><a href="#"> hello@nurency.com</a> </span><br>
                        What'sApp: <span>+8801760706361</span><br>
                    </address>
                    <div class="pi-from-date">
                        <p>inv No: <span>00024</span></p>
                        <div class="pi-from-time">
                            <p>Date:<span> 01-02-2022</span></p>
                            <p>Due Date:<span> 01-02-2022</span></p>
                        </div>
                    </div>
                </div>
                <div class="pi-to">
                    <div class="pi-inv-title">
                        <h2>invoice</h2>
                    </div>
                    <p>Bill to</p>
                    <h6>IBM Design agency</h6>
                    <address>
                        Address:<p>377 Airport - Dakshinkhan Rd, Dhaka 1230</p>
                        Email: <span><a href="#"> hello@nurency.com</a> </span><br>
                        What'sApp: <span>+8801760706361</span><br>
                    </address>
                </div>
            </div>

</div>
<?php
    $invoice_html = ob_get_clean();

if (isset($_GET['download']) ) {  
    $dompdf = new \Dompdf\Dompdf();
    $dompdf->set_option('enable_css_float', true); 
    $dompdf->set_option('enable_remote', true);

    $dompdf->setPaper('A4', 'portrait');
    $dompdf->loadHtml( $invoice_html );
    $dompdf->render();
    $dompdf->stream("invoice-544");
} 
