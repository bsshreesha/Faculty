document.addEventListener("DOMContentLoaded",function(){const d=document.getElementById("studyMat"),c=document.querySelector("#file"),n=document.getElementById("fileUploadContainer"),T=document.getElementById("fileUploadText"),h=document.getElementById("fileList"),m=document.getElementById("fileError"),u=document.querySelector('button[type="submit"]'),x=document.querySelector('button[type="reset"]'),I=document.getElementById("uploadProgress"),M=document.getElementById("progressBar"),S=document.getElementById("progressText");let i=[],p=!1;const D=[{id:"subject",errorId:"subjectError",message:"Please select a subject."},{id:"semester",errorId:"semesterError",message:"Please select a semester."},{id:"title",errorId:"titleError",message:"Please enter a title."},{id:"file",errorId:"fileError",message:"Please upload a file."},{id:"fileDescription",errorId:"fileDescriptionError",message:"Please enter a file description."}];function F(){n.classList.add("uploading"),I.style.display="block";let e=0;const t=setInterval(()=>{e+=Math.random()*15,e>100&&(e=100),M.style.width=e+"%",S.textContent=Math.round(e)+"%",e>=100&&(clearInterval(t),setTimeout(()=>{I.style.display="none",n.classList.remove("uploading"),M.style.width="0%",S.textContent="0%"},500))},200)}function q(){let e=document.getElementById("submissionModal");e||(document.body.insertAdjacentHTML("beforeend",`
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
            `),e=document.getElementById("submissionModal"));const t=new bootstrap.Modal(e);t.show();const s=document.getElementById("submissionProgressBar"),a=document.getElementById("submissionProgressText");let l=0;const o=["Validating form data...","Processing files...","Uploading to server...","Finalizing submission...","Complete!"];let g=0;const B=setInterval(()=>{l+=Math.random()*20+5,l>100&&(l=100),s.style.width=l+"%";const f=Math.floor(l/100*o.length);f>g&&f<o.length&&(g=f,a.textContent=o[g]),l>=100&&(clearInterval(B),a.textContent=o[o.length-1],setTimeout(()=>{t.hide(),R()},1e3))},300)}function R(){const e=O();let t=document.getElementById("successModal");t||(document.body.insertAdjacentHTML("beforeend",`
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
            `),t=document.getElementById("successModal"),document.getElementById("submitAnotherBtn").addEventListener("click",()=>{bootstrap.Modal.getInstance(t).hide(),k()}));const s=document.getElementById("submissionSummary");s.innerHTML=`
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
                                    ${e.files.map(l=>`<div class="fw-semibold">${l.name} <small class="text-muted">(${l.size})</small></div>`).join("")}
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
                                <span class="fw-semibold font-monospace">${P()}</span>
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
        `,new bootstrap.Modal(t).show()}function O(){return{subject:document.getElementById("subject")?.value||"",semester:document.getElementById("semester")?.value||"",title:document.getElementById("title")?.value||"",description:document.getElementById("fileDescription")?.value||"",files:i.map(e=>({name:e.name,size:(e.size/1024/1024).toFixed(2)+" MB",type:e.type}))}}function P(){const e=Date.now().toString(36),t=Math.random().toString(36).substr(2,5);return`SM-${e}-${t}`.toUpperCase()}function N(){if(p)return;p=!0,u.disabled=!0,u.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status"></span>Submitting...',q();const e=new FormData(d);e.delete("file"),i.forEach((t,s)=>{e.append("files[]",t)}),e.append("submission_id",P()),e.append("submission_timestamp",new Date().toISOString()),e.append("file_count",i.length.toString()),setTimeout(()=>{console.log("Form Data to be submitted:");for(let[t,s]of e.entries())console.log(t,s);p=!1,u.disabled=!1,u.innerHTML="SUBMIT"},3e3)}function k(){i=[],c.value="",b([]),n.classList.remove("error","has-files","uploading"),I.style.display="none",M.style.width="0%",S.textContent="0%",m&&(m.textContent=""),d.reset(),document.querySelectorAll(".is-invalid, .is-valid").forEach(e=>{e.classList.remove("is-invalid","is-valid")}),document.querySelectorAll(".error-message").forEach(e=>{e.textContent="",e.style.display="none"}),u.disabled=!1,u.innerHTML='<i class="bi bi-send me-1"></i>Submit Material',p=!1}function w(){const e=new DataTransfer;i.forEach(t=>e.items.add(t)),c.files=e.files}function Y(e,t){const s=new bootstrap.Modal(document.getElementById("filePreviewModal")),a=document.getElementById("filePreviewModalLabel"),l=document.getElementById("filePreviewContent"),o=document.getElementById("removeFileBtn");a.innerHTML='<i class="bi bi-file-earmark-check me-2"></i>File Confirmation & Preview';const g=K(e.type,e.name),B=e.size<=100*1024*1024?'<span class="badge bg-success">Size OK</span>':'<span class="badge bg-danger">Size Too Large</span>',f=_(e.name)?'<span class="badge bg-success">Format Supported</span>':'<span class="badge bg-warning">Format Not Supported</span>',se=`
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
                        <i class="${g} fs-2 me-3 text-primary"></i>
                        <div class="flex-grow-1">
                            <h6 class="mb-1 fw-bold">${e.name}</h6>
                            <div class="d-flex gap-2 flex-wrap">
                                ${B}
                                ${f}
                                <span class="badge bg-info">File ${t+1} of ${i.length}</span>
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
                                <span class="fw-semibold">${E(e.name).toUpperCase()}</span>
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
        `;let y="";if(e.type==="application/pdf"){const r=URL.createObjectURL(e);y=`
                <div class="card border-0 shadow-sm">
                    <div class="card-header">
                        <h6 class="mb-0"><i class="bi bi-file-pdf me-2"></i>PDF Preview</h6>
                    </div>
                    <div class="card-body p-0">
                        <iframe src="${r}" class="pdf-preview" frameborder="0" style="width: 100%; height: 500px;">
                            <div class="p-4 text-center">
                                <p>Your browser does not support PDF preview.</p>
                                <a href="${r}" target="_blank" class="btn btn-outline-primary">
                                    <i class="bi bi-box-arrow-up-right me-1"></i>Open in New Tab
                                </a>
                            </div>
                        </iframe>
                    </div>
                </div>
            `}else e.type.includes("image/")?y=`
                <div class="card border-0 shadow-sm">
                    <div class="card-header">
                        <h6 class="mb-0"><i class="bi bi-image me-2"></i>Image Preview</h6>
                    </div>
                    <div class="card-body text-center">
                        <img src="${URL.createObjectURL(e)}" class="img-fluid rounded" alt="File preview" style="max-height: 400px;">
                    </div>
                </div>
            `:e.type.includes("text/")?y=`
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
            `:y=`
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
            `;if(l.innerHTML=se+ie+y,e.type.includes("text/")){const r=new FileReader;r.onload=function(ae){const A=document.getElementById("textPreview");A&&(A.innerHTML=`<pre style="white-space: pre-wrap; margin: 0;">${ae.target.result}</pre>`)},r.readAsText(e)}o.onclick=function(){W(t),s.hide()},s.show()}function K(e,t){const s=E(t);return e==="application/pdf"||s==="pdf"?"bi bi-file-pdf-fill text-danger":e.includes("image/")?"bi bi-file-image-fill text-success":s==="docx"||s==="doc"?"bi bi-file-word-fill text-primary":s==="pptx"||s==="ppt"?"bi bi-file-ppt-fill text-warning":e.includes("text/")?"bi bi-file-text-fill text-info":"bi bi-file-earmark-fill text-secondary"}function E(e){return e.split(".").pop().toLowerCase()}function V(e){switch(E(e)){case"pdf":return"PDF Document";case"docx":case"doc":return"Microsoft Word Document";case"pptx":case"ppt":return"Microsoft PowerPoint Presentation";case"txt":return"Text Document";case"jpg":case"jpeg":case"png":case"gif":return"Image File";default:return"Unknown File Type"}}function _(e){const t=["pdf","docx","doc","pptx","ppt"],s=E(e);return t.includes(s)}function W(e){i.splice(e,1),w(),b(i),L()}function b(e){if(e.length===0){h.style.display="none",n.classList.remove("has-files"),T.innerHTML=`
                <strong>Click to browse files</strong><br>
                or drag and drop your files here<br>
                <small>PDF, Word (.docx), PowerPoint (.pptx) • Max 100MB each</small>
            `;return}n.classList.add("has-files"),T.innerHTML=`<strong>${e.length} file(s) selected</strong>`,h.innerHTML=e.map((t,s)=>`
            <div class="file-item" data-file-index="${s}" title="Click to preview">
                <i class="bi bi-file-earmark text-primary"></i>
                <span class="flex-grow-1">${t.name}</span>
                <small class="text-muted">${(t.size/1024/1024).toFixed(2)} MB</small>
                <i class="bi bi-eye text-secondary ms-2"></i>
            </div>
        `).join(""),h.querySelectorAll(".file-item").forEach((t,s)=>{t.addEventListener("click",()=>{Y(e[s],s)})}),h.style.display="block"}function L(){return c?(n.classList.remove("error"),m&&(m.textContent=""),i.length===0?(n.classList.add("error"),m&&(m.textContent="Please select at least one file."),b([]),!1):i.length>5?(alert("You can upload 5 files only."),i=i.slice(0,5),w(),b(i),!0):(b(i),!0)):!1}function G(){let e=!0;return D.forEach(t=>{const s=document.getElementById(t.id),a=document.getElementById(t.errorId);!s||!a||(s.value.trim()?(s.classList.remove("is-invalid"),s.classList.add("is-valid"),a.style.display="none"):(s.classList.add("is-invalid"),s.classList.remove("is-valid"),a.textContent=t.message,a.style.display="block",e=!1))}),L()||(e=!1),e}n&&(n.addEventListener("click",function(e){!e.target.closest(".file-item")&&!e.target.closest(".btn-close")&&c.click()}),n.style.cursor="pointer"),c&&c.addEventListener("change",function(e){const t=Array.from(e.target.files);t.forEach(s=>{i.some(a=>a.name===s.name&&a.size===s.size&&a.lastModified===s.lastModified)||i.push(s)}),i.length>5&&(alert("You can upload a maximum of 5 files. Only the first 5 files will be kept."),i=i.slice(0,5)),w(),L(),t.length>0&&F()}),n&&(["dragenter","dragover","dragleave","drop"].forEach(e=>{n.addEventListener(e,j,!1),document.body.addEventListener(e,j,!1)}),["dragenter","dragover"].forEach(e=>{n.addEventListener(e,J,!1)}),["dragleave","drop"].forEach(e=>{n.addEventListener(e,Q,!1)}),n.addEventListener("drop",X,!1));function j(e){e.preventDefault(),e.stopPropagation()}function J(e){n.classList.add("drag-over")}function Q(e){n.classList.remove("drag-over")}function X(e){const t=e.dataTransfer,s=Array.from(t.files);s.forEach(a=>{i.some(l=>l.name===a.name&&l.size===a.size&&l.lastModified===a.lastModified)||i.push(a)}),i.length>5&&(alert("You can upload a maximum of 5 files. Only the first 5 files will be kept."),i=i.slice(0,5)),w(),L(),s.length>0&&F()}D.forEach(e=>{const t=document.getElementById(e.id);t&&e.id!=="file"&&(t.addEventListener("input",function(){const s=document.getElementById(e.errorId);s&&(this.value.trim()?(this.classList.remove("is-invalid"),this.classList.add("is-valid"),s.style.display="none"):(this.classList.add("is-invalid"),this.classList.remove("is-valid"),s.textContent=e.message,s.style.display="block"))}),t.addEventListener("blur",function(){const s=document.getElementById(e.errorId);s&&(this.value.trim()?(this.classList.remove("is-invalid"),this.classList.add("is-valid"),s.style.display="none"):(this.classList.add("is-invalid"),this.classList.remove("is-valid"),s.textContent=e.message,s.style.display="block"))}))}),d&&d.addEventListener("submit",function(e){if(e.preventDefault(),!G()){const t=document.querySelector(".is-invalid");t&&(t.scrollIntoView({behavior:"smooth",block:"center"}),t.focus());return}N()}),x&&x.addEventListener("click",function(e){e.preventDefault(),!((i.length>0||d.querySelector("input, textarea, select").value)&&!confirm("Are you sure you want to reset the form? All entered data and selected files will be lost."))&&k()});const $=document.getElementById("fileDescription"),v=document.getElementById("charCount");$&&v&&$.addEventListener("input",function(){const e=this.value.length,t=this.getAttribute("maxlength")||500;v.textContent=`${e}/${t}`;const s=e/t*100;s>=90?v.className="text-danger small":s>=75?v.className="text-warning small":v.className="text-muted small"});const C=document.getElementById("subject"),U=document.getElementById("semester");C&&U&&C.addEventListener("change",function(){this.value&&Array.from(U.options).forEach(t=>{t.value!==""&&(t.disabled=!1,t.style.display="block")})});function Z(){document.getElementById("subject")?.value,document.getElementById("semester")?.value,document.getElementById("title")?.value,document.getElementById("fileDescription")?.value,new Date().toISOString(),ee()}function ee(){let e=document.getElementById("autoSaveIndicator");e||(e=document.createElement("div"),e.id="autoSaveIndicator",e.className="position-fixed bottom-0 end-0 m-3 alert alert-success alert-dismissible fade show",e.style.zIndex="9999",e.innerHTML=`
                <i class="bi bi-check-circle me-2"></i>
                Draft saved automatically
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `,document.body.appendChild(e),setTimeout(()=>{e&&e.parentNode&&e.remove()},3e3))}const te=["subject","semester","title","fileDescription"];let H;te.forEach(e=>{const t=document.getElementById(e);t&&t.addEventListener("input",()=>{clearTimeout(H),H=setTimeout(Z,3e4)})}),document.addEventListener("keydown",function(e){(e.ctrlKey||e.metaKey)&&e.key==="s"&&(e.preventDefault(),d&&!p&&d.dispatchEvent(new Event("submit"))),(e.ctrlKey||e.metaKey)&&e.key==="r"&&(e.preventDefault(),x&&x.click()),e.key==="Escape"&&document.querySelectorAll(".modal.show").forEach(s=>{const a=bootstrap.Modal.getInstance(s);a&&a.hide()})}),console.log("Study Material Form initialized successfully");const z=document.querySelector("select, input, textarea");z&&z.focus()});
