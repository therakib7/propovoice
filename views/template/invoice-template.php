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
@page { margin: 0; }
</style>
<img src=" " />
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
} else {
    echo $invoice_html;
}
