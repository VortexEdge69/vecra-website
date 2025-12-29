(()=>{var e={};e.id=398,e.ids=[398],e.modules={3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},14985:e=>{"use strict";e.exports=require("dns")},21820:e=>{"use strict";e.exports=require("os")},27910:e=>{"use strict";e.exports=require("stream")},28354:e=>{"use strict";e.exports=require("util")},29021:e=>{"use strict";e.exports=require("fs")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},33873:e=>{"use strict";e.exports=require("path")},34631:e=>{"use strict";e.exports=require("tls")},44870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},55511:e=>{"use strict";e.exports=require("crypto")},55591:e=>{"use strict";e.exports=require("https")},61904:(e,t,r)=>{"use strict";r.d(t,{g:()=>s});var o=r(49526);class i{constructor(){this.transporter=o.createTransport({service:"gmail",auth:{user:process.env.EMAIL_USER,pass:process.env.EMAIL_APP_PASSWORD}})}async sendEmail(e){try{let t={from:`"VecraHost" <${process.env.EMAIL_USER}>`,to:e.to,subject:e.subject,html:e.html,text:e.text||e.html.replace(/<[^>]*>/g,"")},r=await this.transporter.sendMail(t);return console.log("Email sent successfully:",r.messageId),!0}catch(e){return console.error("Email sending failed:",e),!1}}async sendPaymentNotification(e){let t=process.env.ADMIN_EMAIL||process.env.EMAIL_USER,r=process.env.ADDITIONAL_EMAIL?.split(",")||[];if(!t)return console.error("No admin email configured"),!1;let o=[t,...r],i=`
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
                <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #0076fe; margin: 0;">🎉 New Payment Received!</h1>
                    </div>
                    
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                        <h2 style="color: #333; margin-top: 0;">Payment Details</h2>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #555;">Customer Email:</td>
                                <td style="padding: 8px 0; color: #333;">${e.customerEmail}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #555;">Plan:</td>
                                <td style="padding: 8px 0; color: #333;">${e.planName}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #555;">Amount:</td>
                                <td style="padding: 8px 0; color: #28a745; font-weight: bold;">₹${e.amount}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #555;">UTR Number:</td>
                                <td style="padding: 8px 0; color: #333; font-family: monospace;">${e.utr}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #555;">Timestamp:</td>
                                <td style="padding: 8px 0; color: #333;">${new Date(e.timestamp).toLocaleString("en-IN",{timeZone:"Asia/Kolkata",dateStyle:"full",timeStyle:"medium"})}</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div style="background-color: #e3f2fd; padding: 15px; border-radius: 8px; border-left: 4px solid #0076fe;">
                        <p style="margin: 0; color: #1976d2;">
                            <strong>Next Steps:</strong> Please verify the payment and activate the customer's service.
                        </p>
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                        <p style="color: #666; font-size: 14px; margin: 0;">
                            This notification was sent from VecraHost Payment System
                        </p>
                    </div>
                </div>
            </div>
        `;return await this.sendEmail({to:o.join(", "),subject:`💰 New Payment: ${e.planName} - ₹${e.amount}`,html:i})}async sendVpsNotification(e){let t=process.env.ADMIN_EMAIL||process.env.EMAIL_USER,r=process.env.ADDITIONAL_EMAIL?.split(",")||[];if(!t)return console.error("No admin email configured"),!1;let o=[t,...r],i=`
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
                <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #0076fe; margin: 0;">📧 VPS Interest Notification</h1>
                    </div>
                    
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                        <h2 style="color: #333; margin-top: 0;">Customer Details</h2>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
                                <td style="padding: 8px 0; color: #333;">${e}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #555;">Timestamp:</td>
                                <td style="padding: 8px 0; color: #333;">${new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata",dateStyle:"full",timeStyle:"medium"})}</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107;">
                        <p style="margin: 0; color: #856404;">
                            <strong>Action Required:</strong> Customer is interested in VPS hosting. Consider reaching out when VPS plans become available.
                        </p>
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                        <p style="color: #666; font-size: 14px; margin: 0;">
                            This notification was sent from VecraHost VPS Interest System
                        </p>
                    </div>
                </div>
            </div>
        `;return await this.sendEmail({to:o.join(", "),subject:`📧 VPS Interest: ${e}`,html:i})}async sendCustomPlanRequest(e,t,r){let o=process.env.ADMIN_EMAIL||process.env.EMAIL_USER,i=process.env.ADDITIONAL_EMAIL?.split(",")||[];if(!o)return console.error("No admin email configured"),!1;let s=[o,...i],a="minecraft"===e?"Minecraft":"VPS",n=Object.entries(r).filter(([,e])=>(e??"").toString().trim().length>0).map(([e,t])=>`
                <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #555; text-transform: capitalize;">${e.replace(/([A-Z])/g," $1").trim()}</td>
                    <td style="padding: 8px 0; color: #333;">${t}</td>
                </tr>
            `).join(""),d=`
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
                <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #0076fe; margin: 0;">🛠️ Custom ${a} Plan Request</h1>
                    </div>
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                        <h2 style="color: #333; margin-top: 0;">Customer Details</h2>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
                                <td style="padding: 8px 0; color: #333;">${t}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #555;">Requested At:</td>
                                <td style="padding: 8px 0; color: #333;">${new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata",dateStyle:"full",timeStyle:"medium"})}</td>
                            </tr>
                        </table>
                    </div>
                    <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                        <h2 style="color: #333; margin-top: 0;">Requested Specifications</h2>
                        <table style="width: 100%; border-collapse: collapse;">
                            ${n||'<tr><td style="color:#777">No specific specs provided</td></tr>'}
                        </table>
                    </div>
                    <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107;">
                        <p style="margin: 0; color: #856404;">
                            <strong>Action Required:</strong> Please review the custom request and follow up with the customer.
                        </p>
                    </div>
                    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                        <p style="color: #666; font-size: 14px; margin: 0;">
                            This notification was sent from VecraHost Custom Plan Request System
                        </p>
                    </div>
                </div>
            </div>
        `;return await this.sendEmail({to:s.join(", "),subject:`🛠️ Custom ${a} Request: ${t}`,html:d})}async sendSupportRequest(e,t,r){let o=process.env.ADMIN_EMAIL||process.env.EMAIL_USER,i=process.env.ADDITIONAL_EMAIL?.split(",")||[];if(!o)return console.error("No admin email configured"),!1;let s=[o,...i],a=`
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
                <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #0076fe; margin: 0;">🛠️ New Support Request</h1>
                    </div>
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                        <h2 style="color: #333; margin-top: 0;">Request Details</h2>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
                                <td style="padding: 8px 0; color: #333;">${r}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #555;">Category:</td>
                                <td style="padding: 8px 0; color: #333;">${e}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #555;">Description:</td>
                                <td style="padding: 8px 0; color: #333; white-space: pre-wrap;">${t}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; font-weight: bold; color: #555;">Timestamp:</td>
                                <td style="padding: 8px 0; color: #333;">${new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata",dateStyle:"full",timeStyle:"medium"})}</td>
                            </tr>
                        </table>
                    </div>
                    <div style="background-color: #e3f2fd; padding: 15px; border-radius: 8px; border-left: 4px solid #0076fe;">
                        <p style="margin: 0; color: #1976d2;">
                            <strong>Action Required:</strong> Please review and respond to the customer's support request.
                        </p>
                    </div>
                    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                        <p style="color: #666; font-size: 14px; margin: 0;">
                            This notification was sent from VecraHost Support System
                        </p>
                    </div>
                </div>
            </div>
        `;return await this.sendEmail({to:s.join(", "),subject:`🛠️ Support Request: ${e} - ${r}`,html:a})}}let s=new i},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},74075:e=>{"use strict";e.exports=require("zlib")},77081:(e,t,r)=>{"use strict";r.r(t),r.d(t,{patchFetch:()=>g,routeModule:()=>p,serverHooks:()=>m,workAsyncStorage:()=>c,workUnitAsyncStorage:()=>u});var o={};r.r(o),r.d(o,{POST:()=>l});var i=r(96559),s=r(48088),a=r(37719),n=r(32190),d=r(61904);async function l(e){try{let{email:t,utr:r,amount:o,planName:i}=await e.json();if(!t||!r||!o||!i)return n.NextResponse.json({error:"Missing required fields"},{status:400});let s=new Date().toISOString();console.log("Payment Confirmation:",{email:t,utr:r,amount:o,planName:i,timestamp:s});try{await d.g.sendPaymentNotification({customerEmail:t,utr:r,amount:o,planName:i,timestamp:s})?console.log("✅ Payment notification email sent successfully"):console.log("❌ Failed to send payment notification email")}catch(e){console.error("Email sending error:",e)}return n.NextResponse.json({message:"Payment confirmation processed successfully",emailSent:!0},{status:200})}catch(e){return console.error("Payment confirmation error:",e),n.NextResponse.json({error:"Internal server error"},{status:500})}}let p=new i.AppRouteRouteModule({definition:{kind:s.RouteKind.APP_ROUTE,page:"/api/payment-confirmation/route",pathname:"/api/payment-confirmation",filename:"route",bundlePath:"app/api/payment-confirmation/route"},resolvedPagePath:"C:\\Users\\VortexEdge\\Documents\\GitHub\\vecra-website\\src\\app\\api\\payment-confirmation\\route.ts",nextConfigOutput:"",userland:o}),{workAsyncStorage:c,workUnitAsyncStorage:u,serverHooks:m}=p;function g(){return(0,a.patchFetch)({workAsyncStorage:c,workUnitAsyncStorage:u})}},78335:()=>{},79551:e=>{"use strict";e.exports=require("url")},79646:e=>{"use strict";e.exports=require("child_process")},81630:e=>{"use strict";e.exports=require("http")},91645:e=>{"use strict";e.exports=require("net")},94735:e=>{"use strict";e.exports=require("events")},96487:()=>{}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),o=t.X(0,[447,580,526],()=>r(77081));module.exports=o})();