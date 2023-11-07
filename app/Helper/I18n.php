<?php

namespace Ndpv\Helper;

class I18n
{
    static function dashboard()
    {
        return [
            //modules
            "db" => esc_html__("Dashboard", "propovoice"),
            "lead" => esc_html__("Lead", "propovoice"),
            "deal" => esc_html__("Deal", "propovoice"),
            "est" => esc_html__("Estimate", "propovoice"),
            "estNo" => esc_html__("Estimate No", "propovoice"),
            "inv" => esc_html__("Invoice", "propovoice"),
            "invNo" => esc_html__("Invoice No", "propovoice"),
            "client" => esc_html__("Client", "propovoice"),
            "project" => esc_html__("Project", "propovoice"),
            "task" => esc_html__("Task", "propovoice"),
            "ct" => esc_html__("Contact", "propovoice"),
            "ct_book" => esc_html__("Contact Book", "propovoice"),
            //alert
            "scf" => esc_html__("Successfully", "propovoice"),
            "aAdd" => esc_html__("Successfully Added", "propovoice"),
            "aUpd" => esc_html__("Successfully Updated", "propovoice"),
            "aDel" => esc_html__("Successfully Deleted", "propovoice"),
            "aThankM" => esc_html__("Thanks for your message", "propovoice"),
            "aThankR" => esc_html__("Thanks for payment request", "propovoice"),
            "aMail" => esc_html__("Mail successfully sent", "propovoice"),
            "aDelM" => esc_html__("Successfully moved to deal", "propovoice"),
            "aProM" => esc_html__(
                "Successfully moved to project",
                "propovoice"
            ),
            "aConf" => esc_html__("Are you sure to delete it?", "propovoice"),
            "receiver_missing" => esc_html__("Receiver is missing", "propovoice"),
            "cc" => esc_html__("Copied", "propovoice"),
            "conV" => esc_html__("convert", "propovoice"),
            //dashboard
            "ov" => esc_html__("Overview", "propovoice"),
            "total_client" => esc_html__("Total Client", "propovoice"),
            "total_clients" => esc_html__("Total Clients", "propovoice"),
            "total_lead" => esc_html__("Total Lead", "propovoice"),
            "total_leads" => esc_html__("Total Leads", "propovoice"),
            "total_deal" => esc_html__("Total Deal", "propovoice"),
            "total_deals" => esc_html__("Total Deals", "propovoice"),
            "total_invoice" => esc_html__("Total Invoice", "propovoice"),
            "total_invoices" => esc_html__("Total Invoices", "propovoice"),
            "total_estimate" => esc_html__("Total Estimate", "propovoice"),
            "total_estimates" => esc_html__("Total Estimates", "propovoice"),
            "total_project" => esc_html__("Total Project", "propovoice"),
            "total_projects" => esc_html__("Total Projects", "propovoice"),
            "latest" => esc_html__("Latest", "propovoice"),
            "latest_task" => __("Latest Task", "propovoice"),
            "trk" => esc_html__("Tracking", "propovoice"),
            //lead
            "level" => esc_html__("Level", "propovoice"),
            "ct_img" => esc_html__("Contact Image", "propovoice"),
            "source" => esc_html__("Source", "propovoice"),
            //deal
            "deal_pipeline" => esc_html__("Deal Pipeline", "propovoice"),
            "deal_funnel" => esc_html__("Deal Funnel", "propovoice"),
            "deal_won" => esc_html__("Deal Won", "propovoice"),
            "deal_lost" => esc_html__("Deal Lost", "propovoice"),
            "deal_stage" => esc_html__("Deal Stage", "propovoice"),
            "add_stage" => esc_html__("Add Stage", "propovoice"),
            "add_deal" => esc_html__("Add Deal", "propovoice"),
            "ct_name" => esc_html__("Contact Name", "propovoice"),
            "stage" => esc_html__("Stage", "propovoice"),
            "won" => esc_html__("Won", "propovoice"),
            "lost" => esc_html__("Lost", "propovoice"),
            "proba" => esc_html__("Probability", "propovoice"),
            //estinv
            "nd" => __("&", "propovoice"),
            "est_num" => esc_html__("Estimate Number", "propovoice"),
            "est_date" => esc_html__("Estimate Date", "propovoice"),
            "inv_num" => esc_html__("Invoice Number", "propovoice"),
            "inv_date" => esc_html__("Invoice Date", "propovoice"),
            "tmpl" => esc_html__("Template", "propovoice"),
            "con" => esc_html__("Content", "propovoice"),
            "num" => esc_html__("Number", "propovoice"),
            "sndr" => esc_html__("Sender", "propovoice"),
            "rec" => esc_html__("Receiver", "propovoice"),
            "item" => esc_html__("Item", "propovoice"),
            "items" => esc_html__("Items", "propovoice"),
            "qty" => esc_html__("Quantity", "propovoice"),
            "rate" => esc_html__("Rate", "propovoice"),
            "amt" => esc_html__("Amount", "propovoice"),
            "adtl" => esc_html__("Additional", "propovoice"),
            "ext" => esc_html__("Extra", "propovoice"),
            "subT" => esc_html__("Subtotal", "propovoice"),
            "down" => esc_html__("Download", "propovoice"),
            "print" => esc_html__("Print", "propovoice"),
            "send_email" => esc_html__("Send Email", "propovoice"),
            "share" => esc_html__("Share", "propovoice"),
            "send" => esc_html__("Send", "propovoice"),
            "sent" => esc_html__("Sent", "propovoice"),
            "viewed" => esc_html__("Viewed", "propovoice"),
            "acptd" => esc_html__("Accepted", "propovoice"),
            "acpt" => esc_html__("Accept", "propovoice"),
            "dec" => esc_html__("Declined", "propovoice"),
            "paid" => esc_html__("Paid", "propovoice"),
            "unpaid" => esc_html__("Unpaid", "propovoice"),
            "ovd" => esc_html__("Overdue", "propovoice"),
            "rem" => esc_html__("Reminder", "propovoice"),
            "def" => esc_html__("Default", "propovoice"),
            "recur" => esc_html__("Recurring", "propovoice"),
            "lang" => esc_html__("Language", "propovoice"),
            "hide" => esc_html__("Hide", "propovoice"),
            "pos" => esc_html__("Position", "propovoice"),
            "before" => esc_html__("Before", "propovoice"),
            "after" => esc_html__("After", "propovoice"),
            "authSign" => esc_html__("Authorized Signature", "propovoice"),
            "Sign" => esc_html__("Signature", "propovoice"),
            "style" => esc_html__("Style", "propovoice"),
            "addi" => esc_html__("Additional", "propovoice"),
            "staff" => esc_html__("Staff", "propovoice"),
            //Client
            "add_Client" => esc_html__("Add Client", "propovoice"),
            //project
            "add_Project" => esc_html__("Add Project", "propovoice"),
            "cur" => esc_html__("Currency", "propovoice"),
            "budget" => esc_html__("Budget", "propovoice"),
            //contact
            "add_Person" => esc_html__("Add Person", "propovoice"),
            "add_Organization" => esc_html__("Add Organization", "propovoice"),
            "book" => esc_html__("Book", "propovoice"),
            "prsn" => esc_html__("Person", "propovoice"),
            "org" => esc_html__("Organization", "propovoice"),
            "name" => esc_html__("Name", "propovoice"),
            "email" => esc_html__("Email", "propovoice"),
            "mob" => esc_html__("Mobile", "propovoice"),
            "web" => esc_html__("Website", "propovoice"),
            "url" => esc_html__("URL", "propovoice"),
            "country" => esc_html__("Country", "propovoice"),
            "region" => esc_html__("Region", "propovoice"),
            "state_region" => esc_html__("State / Province / Region", "propovoice"),
            "city" => esc_html__("City", "propovoice"),
            "zip" => esc_html__("ZIP Code", "propovoice"),
            //common
            "home" => esc_html__("Home", "propovoice"),
            "total" => esc_html__("Total", "propovoice"),
            "prv" => esc_html__("Preview", "propovoice"),
            "client_prv" => esc_html__("Client Preview", "propovoice"),
            "full_prv" => esc_html__("Full Preview", "propovoice"),
            "tmpl_prv" => esc_html__("Template Preview", "propovoice"),
            "aut" => esc_html__("Author", "propovoice"),
            //invoice
            "bill" => esc_html__("Bill", "propovoice"),
            "billTo" => esc_html__("Bill To", "propovoice"),
            "info" => esc_html__("Info", "propovoice"),
            "no" => esc_html__("No", "propovoice"),
            //discussion
            "add_checklist" => esc_html__("Add Checklist", "propovoice"),
            "task_done_out" => esc_html__("task done out of", "propovoice"),
            "comment" => esc_html__("Comment", "propovoice"),
            "send_team" => esc_html__("Send to Team", "propovoice"),
            "reply_client" => esc_html__("Reply to Client", "propovoice"),
            "write_msg" => esc_html__("Write your message", "propovoice"),
            "write_comment" => esc_html__("Write your comment", "propovoice"),
            "task_creator" => esc_html__("Task Creator", "propovoice"),
            "no_comment" => esc_html__("This is no comment", "propovoice"),
            //client portal
            "tbl_view" => esc_html__("Table View", "propovoice"),
            "req_project" => esc_html__("Requested Project", "propovoice"),
            "board_view" => esc_html__("Board View", "propovoice"),
            "no_req_project" => __("You don't have any Requested Project", "propovoice"),
            "no_project" => __("You don't have any Project", "propovoice"),
            //table
            "status" => esc_html__("Status", "propovoice"),
            "created_at" => esc_html__("Created At", "propovoice"),
            "date" => esc_html__("Date", "propovoice"),
            "start_date" => esc_html__("Start Date", "propovoice"),
            "due_date" => esc_html__("Due Date", "propovoice"),
            "action" => esc_html__("Action", "propovoice"),
            "show" => esc_html__("Show", "propovoice"),
            "all" => esc_html__("All", "propovoice"),
            "alw" => esc_html__("Always", "propovoice"),
            "search" => esc_html__("Search", "propovoice"),
            "select" => esc_html__("Select", "propovoice"),
            "type" => esc_html__("Type", "propovoice"),
            "loc" => esc_html__("Location", "propovoice"),
            "rate" => esc_html__("Rate", "propovoice"),
            "dup" => esc_html__("Duplicate", "propovoice"),
            "dft" => esc_html__("Draft", "propovoice"),
            "req" => esc_html__("Request", "propovoice"),
            "portal_access" => esc_html__("Portal Access", "propovoice"),
            //form
            /* translators: %s: Add, Edit %s: Module Name */
            "formDesc" => esc_html__("%s %s here", "propovoice"),
            "payDesc" => esc_html__("Add payment info here", "propovoice"),
            "create" => esc_html__("Create", "propovoice"),
            "icon" => esc_html__("Icon", "propovoice"),
            "text" => esc_html__("Text", "propovoice"),
            "multiselect" => esc_html__("Multiselect", "propovoice"),
            "radio" => esc_html__("Radio", "propovoice"),
            "number" => esc_html__("Number", "propovoice"),
            "img" => esc_html__("Image", "propovoice"),
            "add" => esc_html__("Add", "propovoice"),
            "addTo" => esc_html__("Add To", "propovoice"),
            "new" => esc_html__("New", "propovoice"),
            "add_new" => esc_html__("Add New", "propovoice"),
            "add_new_ct" => esc_html__("Add New Contact", "propovoice"),
            "add_new_client" => esc_html__("Add New Client", "propovoice"),
            "edit" => esc_html__("Edit", "propovoice"),
            "edit_ct" => esc_html__("Edit Contact", "propovoice"),
            "edit_client" => esc_html__("Edit Client", "propovoice"),
            "upd" => esc_html__("Update", "propovoice"),
            "del" => esc_html__("Delete", "propovoice"),
            "new" => esc_html__("New", "propovoice"),
            "from" => esc_html__("From", "propovoice"),
            "here" => esc_html__("here", "propovoice"),
            "tag" => esc_html__("Tag", "propovoice"),
            "bg" => esc_html__("Background", "propovoice"),
            "txt" => esc_html__("Text", "propovoice"),
            "color" => esc_html__("Color", "propovoice"),
            "desc" => esc_html__("Description", "propovoice"),
            "discuss" => esc_html__("Discussion", "propovoice"),
            "note" => esc_html__("Note", "propovoice"),
            "title" => esc_html__("Title", "propovoice"),
            "start" => esc_html__("Start", "propovoice"),
            "due" => esc_html__("Due", "propovoice"),
            "sub" => esc_html__("Subject", "propovoice"),
            "msg" => esc_html__("Message", "propovoice"),
            "clear" => esc_html__("Clear", "propovoice"),
            "cancel" => esc_html__("Cancel", "propovoice"),
            "account" => esc_html__("Account", "propovoice"),
            "pub" => esc_html__("Public", "propovoice"),
            "secret" => esc_html__("Secret", "propovoice"),
            "id" => esc_html__("ID", "propovoice"),
            "key" => esc_html__("Key", "propovoice"),
            "pers" => esc_html__("Personal", "propovoice"),
            "profile" => esc_html__("Profile", "propovoice"),
            "file" => esc_html__("File", "propovoice"),
            "section" => esc_html__("Section", "propovoice"),
            "dtl" => esc_html__("Details", "propovoice"),
            "cat" => esc_html__("Category", "propovoice"),
            "assign" => esc_html__("Assign", "propovoice"),
            //btn
            "logo" => esc_html__("Logo", "propovoice"),
            "cont" => esc_html__("Continue", "propovoice"),
            "save" => esc_html__("Save", "propovoice"),
            "copy_form_code" => esc_html__("Copy Embeded Code", "propovoice"),
            "close" => esc_html__("Close", "propovoice"),
            //settings
            "cmn" => esc_html__("Common", "propovoice"),
            "settings" => esc_html__("Settings", "propovoice"),
            "pre" => esc_html__("Prefix", "propovoice"),
            "gen" => esc_html__("General", "propovoice"),
            "password" => esc_html__("Password", "propovoice"),
            "biz" => esc_html__("Business", "propovoice"),
            "pay" => esc_html__("Pay", "propovoice"),
            "subs" => esc_html__("Subscribe", "propovoice"),
            "subsed" => esc_html__("Subscribed", "propovoice"),
            "substion" => esc_html__("Subscription", "propovoice"),
            "payment" => esc_html__("Payment", "propovoice"),
            "hst" => esc_html__("History", "propovoice"),
            "paymentInfo" => esc_html__("Payment Info", "propovoice"),
            "method" => esc_html__("Method", "propovoice"),
            "var" => esc_html__("Variable", "propovoice"),
            "imp" => esc_html__("Import", "propovoice"),
            "exp" => esc_html__("Export", "propovoice"),
            "intg" => esc_html__("Integration", "propovoice"),
            "license" => esc_html__("License", "propovoice"),
            "exps" => esc_html__("Expires", "propovoice"),
            "valid" => esc_html__("Valid", "propovoice"),
            "expired" => esc_html__("Expired", "propovoice"),
            "prior" => esc_html__("Priority", "propovoice"),
            "meeting" => esc_html__("Meeting Place or", "propovoice"),
            "meet" => esc_html__("meet", "propovoice"),
            "active" => esc_html__("Active", "propovoice"),
            "activate" => esc_html__("Activate", "propovoice"),
            "dactivate" => esc_html__("Deactivate", "propovoice"),
            // seal
            "acceptDes" => esc_html__("Thanks for accepting", "propovoice"),
            "declDes" => esc_html__("Sorry for declining", "propovoice"),
            "decDes" => esc_html__("Sorry for the decline", "propovoice"),
            "ovdDes" => __("You haven't pay yet", "propovoice"),
            "paidDes" => esc_html__("Thanks, We have received the payment", "propovoice" ),
            "paidreqDes" => esc_html__("You have submited your payment information. it will take a while to approve the payment", "propovoice"),
            "appp" => esc_html__("Approval Pending", "propovoice"),

            //ext
            "pipeline" => esc_html__("Pipeline", "propovoice"),
            "back_t_db" => esc_html__("Back to WP Dashboard", "propovoice"),
            "mark" => esc_html__("Mark as", "propovoice"),
            "mark_as_sent" => esc_html__("Mark as Sent", "propovoice"),
            "mark_as_paid" => esc_html__("Mark as Paid", "propovoice"),
            "mark_as_acpt" => esc_html__("Mark as Accepted", "propovoice"),
            "mark_as_decl" => esc_html__("Mark as Declined", "propovoice"),
            "drive" => esc_html__("Drive", "propovoice"),
            "done" => esc_html__("Done", "propovoice"),
            "paid" => esc_html__("Paid", "propovoice"),
            "comp" => esc_html__("completed", "propovoice"),
            "as" => esc_html__("as", "propovoice"),
            "suc" => esc_html__("successful", "propovoice"),
            "submit" => esc_html__("Submit", "propovoice"),
            "proposal" => esc_html__("Proposal", "propovoice"),
            "acct" => esc_html__("Accounting", "propovoice"),
            "need" => esc_html__("Need Support", "propovoice"),
            "fdbk" => esc_html__("Feedback", "propovoice"),
            "atch" => esc_html__("Attachment", "propovoice"),
            "fee" => esc_html__("Fee", "propovoice"),
            "field" => esc_html__("Field", "propovoice"),
            "fields" => esc_html__("Fields", "propovoice"),
            "team" => esc_html__("Team", "propovoice"),
            "team_member" => esc_html__("Team Member", "propovoice"),
            "discount" => esc_html__("Discount", "propovoice"),
            "saved_items" => esc_html__("Saved Items", "propovoice"),
            "txn" => esc_html__("Transaction", "propovoice"),
            "stripe" => esc_html__("Stripe", "propovoice"),
            "paypal" => esc_html__("Paypal", "propovoice"),
            "Pub" => esc_html__("Public", "propovoice"),
            "dlvy" => esc_html__("delivery", "propovoice"),
            "option" => esc_html__("option", "propovoice"),
            "upload" => esc_html__("Upload", "propovoice"),
            "link" => esc_html__("link", "propovoice"),
            "first" => esc_html__("First", "propovoice"),
            "last" => esc_html__("Last", "propovoice"),
            "company" => esc_html__("Company", "propovoice"),
            "zoomconn" => esc_html__("Connect Zoom", "propovoice"),
            "unskd" => esc_html__("Unschedule", "propovoice"),
            "addr" => esc_html__("Address", "propovoice"),
            "timeline" => esc_html__(" Timeline", "propovoice"),
            "act" => esc_html__("Active", "propovoice"),
            "media" => esc_html__("Media", "propovoice"),
            "gal" => esc_html__("Gallery", "propovoice"),
            "ins" => esc_html__("Insert", "propovoice"),
            "other" => esc_html__("Others", "propovoice"),
            "bank" => esc_html__("Bank", "propovoice"),
            "skip" => esc_html__("Skip", "propovoice"),
            "label" => esc_html__("Label", "propovoice"),
            "block" => esc_html__("Block", "propovoice"),
            "move" => esc_html__("Move", "propovoice"),
            "moveto" => esc_html__("Move to", "propovoice"),
            "go" => esc_html__("Go", "propovoice"),
            "receipt" => esc_html__("Receipt", "propovoice"),
            "explore" => esc_html__("Explore", "propovoice"),
            "subtotal" => esc_html__("Subtotal", "propovoice"),
            "with" => esc_html__("With", "propovoice"),
            // 'with' => esc_html__('Pay with:', 'propovoice'),
            "witho" => esc_html__("Without", "propovoice"),
            "parent" => esc_html__("Parent", "propovoice"),
            "to" => esc_html__("To", "propovoice"),
            "copy" => esc_html__("Copy", "propovoice"),
            "copy_to_inv" => esc_html__("Copy to Invoice", "propovoice"),
            "per" => esc_html__("Per", "propovoice"),
            "eachitem" => esc_html__("Each Item", "propovoice"),
            "eachitem_tax_field" => esc_html__("Each Item Tax Field", "propovoice"),
            "tax" => esc_html__("Tax", "propovoice"),
            "cal" => esc_html__("Calculation", "propovoice"),
            "fix" => esc_html__("Fixed", "propovoice"),
            "pct" => esc_html__("Percent", "propovoice"),
            "logout" => esc_html__("Logout", "propovoice"),
            "intr" => esc_html__("Integration", "propovoice"),
            "licman" => esc_html__("License Manager", "propovoice"),
            "myw" => esc_html__("My Work", "propovoice"),
            "my" => esc_html__("My", "propovoice"),
            "today" => esc_html__("Today", "propovoice"),
            "othrday" => esc_html__("Others Day", "propovoice"),
            "iselec" => esc_html__("Items Selected", "propovoice"),
            "on" => esc_html__("On", "propovoice"),
            "upPro" => esc_html__("Upgrade to Pro", "propovoice"),
            "tryPro" => esc_html__("Try Propovoice Pro!", "propovoice"),
            "proDesc" => esc_html__(
                "This is pro features, To use this features you need to upgrade with Pro plugin",
                "propovoice"
            ),
            "conDesc" => esc_html__("Contact With Us", "propovoice"),
            "howOf" => esc_html__("How often?", "propovoice"),
            "howM" => esc_html__("How Many?", "propovoice"),
            "onGo" => esc_html__("On going", "propovoice"),
            "auto" => esc_html__("automatically", "propovoice"),
            "draftM" => esc_html__(
                "Create Draft and send manually",
                "propovoice"
            ),
            "sendCy" => esc_html__("Send me a copy", "propovoice"),
            "limit" => esc_html__("Limit", "propovoice"),
            "times" => esc_html__("Times", "propovoice"),
            "dly" => esc_html__("Daily", "propovoice"),
            "wkly" => esc_html__("Weekly", "propovoice"),
            "mth" => esc_html__("Monthly", "propovoice"),
            "qtly" => esc_html__("Quarterly", "propovoice"),
            "yrly" => esc_html__("Yearly", "propovoice"),
            "hYear" => esc_html__("Half Yearly", "propovoice"),
            "cus" => esc_html__("Custom", "propovoice"),
            "cus_fields" => esc_html__("Custom Fields", "propovoice"),
            "intvIn" => esc_html__("Interval In", "propovoice"),
            "hour" => esc_html__("Hour", "propovoice"),
            "day" => esc_html__("Day", "propovoice"),
            "days" => esc_html__("days", "propovoice"),
            "week" => esc_html__("Week", "propovoice"),
            "month" => esc_html__("Month", "propovoice"),
            "year" => esc_html__("Year", "propovoice"),
            "upBy" => esc_html__("Uploaded by", "propovoice"),
            "necInfo" => esc_html__(
                "Please fill up necessary information in the form.",
                "propovoice"
            ),
            "fileInfo" => esc_html__(
                "Please fill up Business info first",
                "propovoice"
            ),
            "bankDesc" => esc_html__(
                "You need to mention bank details here, Like: Name, Routing No. etc",
                "propovoice"
            ),
            /* translators: %s: Module Name */
            "noRes" => esc_html__(
                "No %s found by your search query.",
                "propovoice"
            ),
            /* translators: %s: Adding, Creating text */
            "letStart" => __("Let's Start %s", "propovoice"),
            "let_start_adding" => __("Let's Start Adding", "propovoice"),
            "let_start_creating" => __("Let's Start Creating", "propovoice"),
            "adding" => esc_html__("Adding", "propovoice"),
            "creating" => esc_html__("Creating", "propovoice"),
            "added" => esc_html__("added", "propovoice"),
            "created" => esc_html__("created", "propovoice"),
            /* translators: %s: Added, Created text, %s: Module Name */
            "notAdd" => esc_html__("You have not %s any %s yet.", "propovoice"),
            "any" => esc_html__("any", "propovoice"),

            // import
            "uploadFile" => esc_html__("Click to upload File", "propovoice"),
            "sample" => esc_html__("sample", "propovoice"),
            "nextBtn" => esc_html__("Next [Map Columns]", "propovoice"),
            "csvDco" => esc_html__(
                "Please make sure your csv file has unique
                      headers.Otherwise, it may fail to import",
                "propovoice"
            ),
            // custom field
            "opt" => esc_html__("Option", "propovoice"),
            "optList" => esc_html__("Option list", "propovoice"),
            "optDef" => esc_html__("Default options", "propovoice"),
        ];
    }
}
