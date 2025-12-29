(()=>{var e={};e.id=595,e.ids=[595],e.modules={3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},11997:e=>{"use strict";e.exports=require("punycode")},14985:e=>{"use strict";e.exports=require("dns")},21820:e=>{"use strict";e.exports=require("os")},27910:e=>{"use strict";e.exports=require("stream")},28354:e=>{"use strict";e.exports=require("util")},29021:e=>{"use strict";e.exports=require("fs")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},33873:e=>{"use strict";e.exports=require("path")},34631:e=>{"use strict";e.exports=require("tls")},36463:(e,t,r)=>{"use strict";r.d(t,{A:()=>o});let o={log:(...e)=>{},error:(...e)=>{},warn:(...e)=>{}}},39727:()=>{},44870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},47990:()=>{},55511:e=>{"use strict";e.exports=require("crypto")},55591:e=>{"use strict";e.exports=require("https")},56278:(e,t,r)=>{"use strict";r.d(t,{N:()=>o});let o=(0,r(66437).UU)("https://dywimbkhjtkxmpmxdfru.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5d2ltYmtoanRreG1wbXhkZnJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwMDU0MDUsImV4cCI6MjA3NDU4MTQwNX0.I1YyPJyVucYDmUqQN3YDAaztuS6XmFhtnKX7ZFEFNzo")},61904:(e,t,r)=>{"use strict";r.d(t,{g:()=>s});var o=r(49526);class i{constructor(){this.transporter=o.createTransport({service:"gmail",auth:{user:process.env.EMAIL_USER,pass:process.env.EMAIL_APP_PASSWORD}})}async sendEmail(e){try{let t={from:`"VecraHost" <${process.env.EMAIL_USER}>`,to:e.to,subject:e.subject,html:e.html,text:e.text||e.html.replace(/<[^>]*>/g,"")},r=await this.transporter.sendMail(t);return console.log("Email sent successfully:",r.messageId),!0}catch(e){return console.error("Email sending failed:",e),!1}}async sendPaymentNotification(e){let t=process.env.ADMIN_EMAIL||process.env.EMAIL_USER,r=process.env.ADDITIONAL_EMAIL?.split(",")||[];if(!t)return console.error("No admin email configured"),!1;let o=[t,...r],i=`
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
        `;return await this.sendEmail({to:s.join(", "),subject:`🛠️ Support Request: ${e} - ${r}`,html:a})}}let s=new i},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},74075:e=>{"use strict";e.exports=require("zlib")},78233:(e,t,r)=>{"use strict";r.r(t),r.d(t,{patchFetch:()=>b,routeModule:()=>m,serverHooks:()=>y,workAsyncStorage:()=>x,workUnitAsyncStorage:()=>f});var o={};r.r(o),r.d(o,{POST:()=>c});var i=r(96559),s=r(48088),a=r(37719),n=r(32190),d=r(56278),l=r(36463),p=r(61904);async function c(e){try{let{userId:t,email:r,phoneNumber:o}=await e.json();if(!t||!r||!o)return n.NextResponse.json({error:"Missing required fields"},{status:400});let{data:i,error:s}=await d.N.from("free_trials").select("id, trial_status").eq("user_id",t).single();if(s&&"PGRST116"!==s.code)return l.A.error("Error checking existing trial:",s),n.NextResponse.json({error:"Failed to check trial eligibility"},{status:500});if(i)return n.NextResponse.json({error:"Free trial already utilized",status:i.trial_status},{status:400});let a=await u();if(!a)return n.NextResponse.json({error:"Failed to create server"},{status:500});let p=new Date;p.setHours(p.getHours()+24);let{error:c}=await d.N.from("free_trials").insert({user_id:t,email:r,phone_number:o,trial_status:"active",server_id:a,created_at:new Date().toISOString(),expires_at:p.toISOString()}).select();if(c)return l.A.error("Error creating trial:",c),n.NextResponse.json({error:"Failed to create trial record"},{status:500});return await g(r,o,a),n.NextResponse.json({success:!0,message:"Free trial created successfully",serverId:a,expiresAt:p.toISOString()})}catch(e){return l.A.error("Unexpected error in free trial API:",e),n.NextResponse.json({error:"An unexpected error occurred"},{status:500})}}async function u(){try{return`mock-server-${Date.now()}`}catch(e){return l.A.error("Error creating server on ctrlpanel.gg:",e),null}}async function g(e,t,r){try{let o=process.env.ADMIN_EMAIL||"admin@vecrahost.in";await p.g.sendEmail({to:o,subject:"New Free Trial Server Created",text:`
        A new free trial server has been created:
        
        User Email: ${e}
        Phone Number: ${t}
        Server ID: ${r}
        Created At: ${new Date().toLocaleString()}
        Expires At: ${new Date(Date.now()+864e5).toLocaleString()}
      `,html:`
        <h2>New Free Trial Server Created</h2>
        <p>A new free trial server has been created with the following details:</p>
        <ul>
          <li><strong>User Email:</strong> ${e}</li>
          <li><strong>Phone Number:</strong> ${t}</li>
          <li><strong>Server ID:</strong> ${r}</li>
          <li><strong>Created At:</strong> ${new Date().toLocaleString()}</li>
          <li><strong>Expires At:</strong> ${new Date(Date.now()+864e5).toLocaleString()}</li>
        </ul>
      `})}catch(e){l.A.error("Error sending admin notification email:",e)}}let m=new i.AppRouteRouteModule({definition:{kind:s.RouteKind.APP_ROUTE,page:"/api/free-trial/route",pathname:"/api/free-trial",filename:"route",bundlePath:"app/api/free-trial/route"},resolvedPagePath:"C:\\Users\\VortexEdge\\Documents\\GitHub\\vecra-website\\src\\app\\api\\free-trial\\route.ts",nextConfigOutput:"",userland:o}),{workAsyncStorage:x,workUnitAsyncStorage:f,serverHooks:y}=m;function b(){return(0,a.patchFetch)({workAsyncStorage:x,workUnitAsyncStorage:f})}},78335:()=>{},79428:e=>{"use strict";e.exports=require("buffer")},79551:e=>{"use strict";e.exports=require("url")},79646:e=>{"use strict";e.exports=require("child_process")},81630:e=>{"use strict";e.exports=require("http")},91645:e=>{"use strict";e.exports=require("net")},94735:e=>{"use strict";e.exports=require("events")},96487:()=>{}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),o=t.X(0,[447,580,526,437],()=>r(78233));module.exports=o})();