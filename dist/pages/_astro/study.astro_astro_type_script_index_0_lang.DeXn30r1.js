document.addEventListener("DOMContentLoaded",function(){const d=document.getElementById("studyMat"),p=document.querySelector("#file"),l=document.getElementById("fileUploadContainer"),D=document.getElementById("fileUploadText"),w=document.getElementById("fileList"),m=document.getElementById("fileError"),u=document.querySelector('button[type="submit"]'),E=document.querySelector('button[type="reset"]'),M=document.getElementById("uploadProgress"),S=document.getElementById("progressBar"),B=document.getElementById("progressText");let a=[],v=!1;const F=[{id:"subject",errorId:"subjectError",message:"Please select a subject."},{id:"semester",errorId:"semesterError",message:"Please select a semester."},{id:"title",errorId:"titleError",message:"Please enter a title."},{id:"file",errorId:"fileError",message:"Please upload a file."},{id:"fileDescription",errorId:"fileDescriptionError",message:"Please enter a file description."}];function P(){l.classList.add("uploading"),M.style.display="block";let e=0;const t=setInterval(()=>{e+=Math.random()*15,e>100&&(e=100),S.style.width=e+"%",B.textContent=Math.round(e)+"%",e>=100&&(clearInterval(t),setTimeout(()=>{M.style.display="none",l.classList.remove("uploading"),S.style.width="0%",B.textContent="0%"},500))},200)}function q(){let e=document.getElementById("submissionModal");e||(document.body.insertAdjacentHTML("beforeend",`
                <div class="modal fade" id="submissionModal" tabindex="-1" aria-labelledby="submissionModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header border-0">
                                <h5 class="modal-title" id="submissionModalLabel">
                                    <i class="bi bi-cloud-upload me-2"></i>Submitting Form
                                </h5>
                            </div>
                            <div class="modal-body text-center">
                                <div class="spinner-border text-primary mb-3" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                                <p class="mb-0">Please wait while we process your submission...</p>
                                <div class="progress mt-3" style="height: 8px;">
                                    <div class="progress-bar progress-bar-striped progress-bar-animated" 
                                         id="submissionProgressBar" role="progressbar" style="width: 0%"></div>
                                </div>
                                <small class="text-muted mt-2 d-block" id="submissionProgressText">Preparing submission...</small>
                            </div>
                        </div>
                    </div>
                </div>
            `),e=document.getElementById("submissionModal"));const t=new bootstrap.Modal(e);t.show();const s=document.getElementById("submissionProgressBar"),i=document.getElementById("submissionProgressText");let n=0;const o=["Validating form data...","Processing files...","Uploading to server...","Finalizing submission...","Complete!"];let h=0;const T=setInterval(()=>{n+=Math.random()*20+5,n>100&&(n=100),s.style.width=n+"%";const f=Math.floor(n/100*o.length);f>h&&f<o.length&&(h=f,i.textContent=o[h]),n>=100&&(clearInterval(T),i.textContent=o[o.length-1],setTimeout(()=>{t.hide(),R()},1e3))},300)}function R(){const e=O();let t=document.getElementById("successModal");t||(document.body.insertAdjacentHTML("beforeend",`
                <div class="modal fade" id="successModal" tabindex="-1" aria-labelledby="successModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header bg-success border-0">
                                <h5 class="modal-title" id="successModalLabel">
                                    <i class="bi bi-check-circle-fill me-2"></i>Submission Successful!
                                </h5>
                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="alert alert-success border-0 mb-4">
                                    <h6 class="alert-heading mb-2">Your study material has been submitted successfully!</h6>
                                    <p class="mb-0">Thank you for contributing to the knowledge base. Your submission will be reviewed and made available to other students.</p>
                                </div>
                                <div id="submissionSummary"></div>
                            </div>
                            <div class="modal-footer border-0">
                                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" id="submitAnotherBtn">
                                    <i class="bi bi-plus-circle me-1"></i>Submit Another
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `),t=document.getElementById("successModal"),document.getElementById("submitAnotherBtn").addEventListener("click",()=>{bootstrap.Modal.getInstance(t).hide(),j()}));const s=document.getElementById("submissionSummary");s.innerHTML=`
            <div class="card border-0">
                <div class="card-header bg-transparent border-0 pb-0">
                    <h6 class="mb-0">Submission Summary</h6>
                </div>
                <div class="card-body">
                    <div class="row g-3">
                        <div class="col-md-6">
                            <div class="d-flex justify-content-between">
                                <span class="text-muted">Subject:</span>
                                <span class="fw-semibold">${e.subject}</span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="d-flex justify-content-between">
                                <span class="text-muted">Semester:</span>
                                <span class="fw-semibold">${e.semester}</span>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="d-flex justify-content-between">
                                <span class="text-muted">Title:</span>
                                <span class="fw-semibold">${e.title}</span>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="d-flex justify-content-between align-items-start">
                                <span class="text-muted">Files:</span>
                                <div class="text-end">
                                    ${e.files.map(n=>`<div class="fw-semibold">${n.name} <small class="text-muted">(${n.size})</small></div>`).join("")}
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="d-flex justify-content-between align-items-start">
                                <span class="text-muted">Description:</span>
                                <span class="fw-semibold text-end" style="max-width: 60%;">${e.description}</span>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="d-flex justify-content-between">
                                <span class="text-muted">Submission ID:</span>
                                <span class="fw-semibold font-monospace">${k()}</span>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="d-flex justify-content-between">
                                <span class="text-muted">Submitted:</span>
                                <span class="fw-semibold">${new Date().toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,new bootstrap.Modal(t).show()}function O(){return{subject:document.getElementById("subject")?.value||"",semester:document.getElementById("semester")?.value||"",title:document.getElementById("title")?.value||"",description:document.getElementById("fileDescription")?.value||"",files:a.map(e=>({name:e.name,size:(e.size/1024/1024).toFixed(2)+" MB",type:e.type}))}}function k(){const e=Date.now().toString(36),t=Math.random().toString(36).substr(2,5);return`SM-${e}-${t}`.toUpperCase()}function N(){if(v)return;v=!0,u.disabled=!0,u.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status"></span>Submitting...',q();const e=new FormData(d);e.delete("file"),a.forEach((t,s)=>{e.append("files[]",t)}),e.append("submission_id",k()),e.append("submission_timestamp",new Date().toISOString()),e.append("file_count",a.length.toString()),setTimeout(()=>{console.log("Form Data to be submitted:");for(let[t,s]of e.entries())console.log(t,s);v=!1,u.disabled=!1,u.innerHTML="SUBMIT"},3e3)}function j(){a=[],p.value="",b([]),l.classList.remove("error","has-files","uploading"),M.style.display="none",S.style.width="0%",B.textContent="0%",m&&(m.textContent=""),d.reset(),document.querySelectorAll(".is-invalid, .is-valid").forEach(e=>{e.classList.remove("is-invalid","is-valid")}),document.querySelectorAll(".error-message").forEach(e=>{e.textContent="",e.style.display="none"}),u.disabled=!1,u.innerHTML='<i class="bi bi-send me-1"></i>Submit Material',v=!1}function L(){const e=new DataTransfer;a.forEach(t=>e.items.add(t)),p.files=e.files}function Y(e,t){const s=new bootstrap.Modal(document.getElementById("filePreviewModal")),i=document.getElementById("filePreviewModalLabel"),n=document.getElementById("filePreviewContent"),o=document.getElementById("removeFileBtn");i.innerHTML='<i class="bi bi-file-earmark-check me-2"></i>File Confirmation & Preview';const h=K(e.type,e.name),T=e.size<=100*1024*1024?'<span class="badge bg-success">Size OK</span>':'<span class="badge bg-danger">Size Too Large</span>',f=_(e.name)?'<span class="badge bg-success">Format Supported</span>':'<span class="badge bg-warning">Format Not Supported</span>',se=`
            <div class="alert alert-primary border-0 mb-4">
                <div class="d-flex align-items-center">
                    <i class="bi bi-info-circle-fill fs-4 me-3"></i>
                    <div>
                        <h6 class="alert-heading mb-1">File Confirmation Required</h6>
                        <p class="mb-0">Please review the file details below and confirm if you want to keep this file for upload.</p>
                    </div>
                </div>
            </div>
        `,ie=`
            <div class="card border-0 shadow-sm mb-4">
                <div class="card-header py-3">
                    <div class="d-flex align-items-center">
                        <i class="${h} fs-2 me-3 text-primary"></i>
                        <div class="flex-grow-1">
                            <h6 class="mb-1 fw-bold">${e.name}</h6>
                            <div class="d-flex gap-2 flex-wrap">
                                ${T}
                                ${f}
                                <span class="badge bg-info">File ${t+1} of ${a.length}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row g-3">
                        <div class="col-md-6">
                            <div class="d-flex justify-content-between">
                                <span class="text-muted">File Size:</span>
                                <span class="fw-semibold">${(e.size/1024/1024).toFixed(2)} MB</span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="d-flex justify-content-between">
                                <span class="text-muted">File Type:</span>
                                <span class="fw-semibold">${I(e.name).toUpperCase()}</span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="d-flex justify-content-between">
                                <span class="text-muted">MIME Type:</span>
                                <span class="fw-semibold">${e.type||"Unknown"}</span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="d-flex justify-content-between">
                                <span class="text-muted">Last Modified:</span>
                                <span class="fw-semibold">${new Date(e.lastModified).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;let x="";if(e.type==="application/pdf"){const c=URL.createObjectURL(e);x=`
                <div class="card border-0 shadow-sm">
                    <div class="card-header">
                        <h6 class="mb-0"><i class="bi bi-file-pdf me-2"></i>PDF Preview</h6>
                    </div>
                    <div class="card-body p-0">
                        <iframe src="${c}" class="pdf-preview" frameborder="0" style="width: 100%; height: 500px;">
                            <div class="p-4 text-center">
                                <p>Your browser does not support PDF preview.</p>
                                <a href="${c}" target="_blank" class="btn btn-outline-primary">
                                    <i class="bi bi-box-arrow-up-right me-1"></i>Open in New Tab
                                </a>
                            </div>
                        </iframe>
                    </div>
                </div>
            `}else e.type.includes("image/")?x=`
                <div class="card border-0 shadow-sm">
                    <div class="card-header">
                        <h6 class="mb-0"><i class="bi bi-image me-2"></i>Image Preview</h6>
                    </div>
                    <div class="card-body text-center">
                        <img src="${URL.createObjectURL(e)}" class="img-fluid rounded" alt="File preview" style="max-height: 400px;">
                    </div>
                </div>
            `:e.type.includes("text/")?x=`
                <div class="card border-0 shadow-sm">
                    <div class="card-header bg-light">
                        <h6 class="mb-0"><i class="bi bi-file-text me-2"></i>Text Preview</h6>
                    </div>
                    <div class="card-body">
                        <div id="textPreview" class="bg-light p-3 rounded" style="max-height: 300px; overflow-y: auto; font-family: monospace;">
                            <div class="text-center text-muted">
                                <div class="spinner-border spinner-border-sm me-2" role="status"></div>
                                Loading preview...
                            </div>
                        </div>
                    </div>
                </div>
            `:x=`
                <div class="card border-0 shadow-sm">
                    <div class="card-header bg-light">
                        <h6 class="mb-0"><i class="bi bi-file-earmark me-2"></i>File Information</h6>
                    </div>
                    <div class="card-body">
                        <div class="alert alert-info border-0 mb-0">
                            <div class="d-flex align-items-center">
                                <i class="bi bi-info-circle fs-4 me-3"></i>
                                <div>
                                    <h6 class="alert-heading mb-1">${V(e.name)}</h6>
                                    <p class="mb-0">Preview is not available for this file type, but it will be uploaded successfully if the format is supported.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;if(n.innerHTML=se+ie+x,e.type.includes("text/")){const c=new FileReader;c.onload=function(ae){const A=document.getElementById("textPreview");A&&(A.innerHTML=`<pre style="white-space: pre-wrap; margin: 0;">${ae.target.result}</pre>`)},c.readAsText(e)}o.onclick=function(){W(t),s.hide()},s.show()}function K(e,t){const s=I(t);return e==="application/pdf"||s==="pdf"?"bi bi-file-pdf-fill text-danger":e.includes("image/")?"bi bi-file-image-fill text-success":s==="docx"||s==="doc"?"bi bi-file-word-fill text-primary":s==="pptx"||s==="ppt"?"bi bi-file-ppt-fill text-warning":e.includes("text/")?"bi bi-file-text-fill text-info":"bi bi-file-earmark-fill text-secondary"}function I(e){return e.split(".").pop().toLowerCase()}function V(e){switch(I(e)){case"pdf":return"PDF Document";case"docx":case"doc":return"Microsoft Word Document";case"pptx":case"ppt":return"Microsoft PowerPoint Presentation";case"txt":return"Text Document";case"jpg":case"jpeg":case"png":case"gif":return"Image File";default:return"Unknown File Type"}}function _(e){const t=["pdf","docx","doc","pptx","ppt"],s=I(e);return t.includes(s)}function W(e){a.splice(e,1),L(),b(a),g()}function b(e){if(e.length===0){w.style.display="none",l.classList.remove("has-files"),D.innerHTML=`
                <strong>Click to browse files</strong><br>
                or drag and drop your files here<br>
                <small>PDF, Word (.docx), PowerPoint (.pptx) • Max 100MB each</small>
            `;return}l.classList.add("has-files"),D.innerHTML=`<strong>${e.length} file(s) selected</strong>`,w.innerHTML=e.map((t,s)=>`
            <div class="file-item" data-file-index="${s}" title="Click to preview">
                <i class="bi bi-file-earmark text-primary"></i>
                <span class="flex-grow-1">${t.name}</span>
                <small class="text-muted">${(t.size/1024/1024).toFixed(2)} MB</small>
                <i class="bi bi-eye text-secondary ms-2"></i>
            </div>
        `).join(""),w.querySelectorAll(".file-item").forEach((t,s)=>{t.addEventListener("click",()=>{Y(e[s],s)})}),w.style.display="block"}function g(){return p?(l.classList.remove("error"),m&&(m.textContent=""),a.length===0?(l.classList.add("error"),m&&(m.textContent="Please select at least one file."),b([]),!1):a.length>5?(alert("You can upload 5 files only."),a=a.slice(0,5),L(),b(a),!0):(b(a),!0)):!1}function G(){let e=!0;return F.forEach(t=>{const s=document.getElementById(t.id),i=document.getElementById(t.errorId);!s||!i||(s.value.trim()?(s.classList.remove("is-invalid"),s.classList.add("is-valid"),i.style.display="none"):(s.classList.add("is-invalid"),s.classList.remove("is-valid"),i.textContent=t.message,i.style.display="block",e=!1))}),g()||(e=!1),e}p&&p.addEventListener("change",function(e){const t=Array.from(e.target.files);t.forEach(s=>{a.some(i=>i.name===s.name&&i.size===s.size&&i.lastModified===s.lastModified)||a.push(s)}),a.length>5&&(alert("You can upload a maximum of 5 files. Only the first 5 files will be kept."),a=a.slice(0,5)),L(),g(),t.length>0&&P()}),l&&(["dragenter","dragover","dragleave","drop"].forEach(e=>{l.addEventListener(e,$,!1),document.body.addEventListener(e,$,!1)}),["dragenter","dragover"].forEach(e=>{l.addEventListener(e,J,!1)}),["dragleave","drop"].forEach(e=>{l.addEventListener(e,Q,!1)}),l.addEventListener("drop",X,!1));function $(e){e.preventDefault(),e.stopPropagation()}function J(e){l.classList.add("drag-over")}function Q(e){l.classList.remove("drag-over")}function X(e){const t=e.dataTransfer,s=Array.from(t.files);s.forEach(i=>{a.some(n=>n.name===i.name&&n.size===i.size&&n.lastModified===i.lastModified)||a.push(i)}),a.length>5&&(alert("You can upload a maximum of 5 files. Only the first 5 files will be kept."),a=a.slice(0,5)),L(),g(),s.length>0&&P()}F.forEach(e=>{const t=document.getElementById(e.id);t&&e.id!=="file"&&(t.addEventListener("input",function(){const s=document.getElementById(e.errorId);s&&(this.value.trim()?(this.classList.remove("is-invalid"),this.classList.add("is-valid"),s.style.display="none"):(this.classList.add("is-invalid"),this.classList.remove("is-valid"),s.textContent=e.message,s.style.display="block"))}),t.addEventListener("blur",function(){const s=document.getElementById(e.errorId);s&&(this.value.trim()?(this.classList.remove("is-invalid"),this.classList.add("is-valid"),s.style.display="none"):(this.classList.add("is-invalid"),this.classList.remove("is-valid"),s.textContent=e.message,s.style.display="block"))}))}),d&&d.addEventListener("submit",function(e){if(e.preventDefault(),!G()){const t=document.querySelector(".is-invalid");t&&(t.scrollIntoView({behavior:"smooth",block:"center"}),t.focus());return}N()}),E&&E.addEventListener("click",function(e){e.preventDefault(),!((a.length>0||d.querySelector("input, textarea, select").value)&&!confirm("Are you sure you want to reset the form? All entered data and selected files will be lost."))&&j()});const C=document.getElementById("fileDescription"),y=document.getElementById("charCount");C&&y&&C.addEventListener("input",function(){const e=this.value.length,t=this.getAttribute("maxlength")||500;y.textContent=`${e}/${t}`;const s=e/t*100;s>=90?y.className="text-danger small":s>=75?y.className="text-warning small":y.className="text-muted small"});const U=document.getElementById("subject"),r=document.getElementById("semester");if(U&&r){const e={"computer-science":[1,2,3,4,5,6,7,8],electronics:[1,2,3,4,5,6,7,8],mechanical:[1,2,3,4,5,6,7,8],civil:[1,2,3,4,5,6,7,8],mathematics:[1,2,3,4,5,6],physics:[1,2,3,4,5,6],chemistry:[1,2,3,4,5,6]};U.addEventListener("change",function(){const t=this.value,s=e[t]||[];Array.from(r.options).forEach(i=>{if(i.value==="")return;const n=parseInt(i.value);s.includes(n)?(i.disabled=!1,i.style.display="block"):(i.disabled=!0,i.style.display="none")}),r.value&&!s.includes(parseInt(r.value))&&(r.value="",r.classList.remove("is-valid"),r.classList.add("is-invalid"))})}function Z(){document.getElementById("subject")?.value,document.getElementById("semester")?.value,document.getElementById("title")?.value,document.getElementById("fileDescription")?.value,new Date().toISOString(),ee()}function ee(){let e=document.getElementById("autoSaveIndicator");e||(e=document.createElement("div"),e.id="autoSaveIndicator",e.className="position-fixed bottom-0 end-0 m-3 alert alert-success alert-dismissible fade show",e.style.zIndex="9999",e.innerHTML=`
                <i class="bi bi-check-circle me-2"></i>
                Draft saved automatically
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `,document.body.appendChild(e),setTimeout(()=>{e&&e.parentNode&&e.remove()},3e3))}const te=["subject","semester","title","fileDescription"];let H;te.forEach(e=>{const t=document.getElementById(e);t&&t.addEventListener("input",()=>{clearTimeout(H),H=setTimeout(Z,3e4)})}),document.addEventListener("keydown",function(e){(e.ctrlKey||e.metaKey)&&e.key==="s"&&(e.preventDefault(),d&&!v&&d.dispatchEvent(new Event("submit"))),(e.ctrlKey||e.metaKey)&&e.key==="r"&&(e.preventDefault(),E&&E.click()),e.key==="Escape"&&document.querySelectorAll(".modal.show").forEach(s=>{const i=bootstrap.Modal.getInstance(s);i&&i.hide()})}),console.log("Study Material Form initialized successfully"),g();const z=document.querySelector("select, input, textarea");z&&z.focus()});
