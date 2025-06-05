document.addEventListener("DOMContentLoaded",function(){const h=document.getElementById("py_quespaper"),c=document.querySelector("#file"),a=document.getElementById("fileUploadContainer"),S=document.getElementById("fileUploadText"),v=document.getElementById("fileList"),m=document.getElementById("fileError"),o=document.querySelector('button[type="submit"]'),j=document.querySelector('button[type="reset"]'),x=document.getElementById("uploadProgress"),w=document.getElementById("progressBar"),L=document.getElementById("progressText");let i=[],g=!1;const C=[{id:"subject",errorId:"subjectError",message:"Please select a subject."},{id:"semester",errorId:"semesterError",message:"Please select a semester."},{id:"title",errorId:"titleError",message:"Please enter a title."},{id:"file",errorId:"fileError",message:"Please upload a file."},{id:"fileDescription",errorId:"fileDescriptionError",message:"Please enter a file description."}];function F(){a.classList.add("uploading"),x.style.display="block";let e=0;const s=setInterval(()=>{e+=Math.random()*15,e>100&&(e=100),w.style.width=e+"%",L.textContent=Math.round(e)+"%",e>=100&&(clearInterval(s),setTimeout(()=>{x.style.display="none",a.classList.remove("uploading"),w.style.width="0%",L.textContent="0%"},500))},200)}function U(){let e=document.getElementById("submissionModal");e||(document.body.insertAdjacentHTML("beforeend",`
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
            `),e=document.getElementById("submissionModal"));const s=new bootstrap.Modal(e);s.show();const t=document.getElementById("submissionProgressBar"),n=document.getElementById("submissionProgressText");let l=0;const d=["Validating form data...","Processing files...","Uploading to server...","Finalizing submission...","Complete!"];let b=0;const I=setInterval(()=>{l+=Math.random()*20+5,l>100&&(l=100),t.style.width=l+"%";const p=Math.floor(l/100*d.length);p>b&&p<d.length&&(b=p,n.textContent=d[b]),l>=100&&(clearInterval(I),n.textContent=d[d.length-1],setTimeout(()=>{s.hide(),H()},1e3))},300)}function H(){const e=A();let s=document.getElementById("successModal");s||(document.body.insertAdjacentHTML("beforeend",`
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
            `),s=document.getElementById("successModal"),document.getElementById("submitAnotherBtn").addEventListener("click",()=>{bootstrap.Modal.getInstance(s).hide(),P()}));const t=document.getElementById("submissionSummary");t.innerHTML=`
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
                                <span class="fw-semibold font-monospace">${B()}</span>
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
        `,new bootstrap.Modal(s).show()}function A(){return{subject:document.getElementById("subject")?.value||"",semester:document.getElementById("semester")?.value||"",title:document.getElementById("title")?.value||"",description:document.getElementById("fileDescription")?.value||"",files:i.map(e=>({name:e.name,size:(e.size/1024/1024).toFixed(2)+" MB",type:e.type}))}}function B(){const e=Date.now().toString(36),s=Math.random().toString(36).substr(2,5);return`PYQ-${e}-${s}`.toUpperCase()}function T(){if(g)return;g=!0,o.disabled=!0,o.innerHTML='<span class="spinner-border spinner-border-sm me-2" role="status"></span>Submitting...',U();const e=new FormData(h);e.delete("file"),i.forEach((s,t)=>{e.append("files[]",s)}),e.append("submission_id",B()),e.append("submission_timestamp",new Date().toISOString()),e.append("file_count",i.length.toString()),setTimeout(()=>{console.log("Form Data to be submitted:");for(let[s,t]of e.entries())console.log(s,t);g=!1,o.disabled=!1,o.innerHTML="SUBMIT"},3e3)}function P(){i=[],c.value="",u([]),a.classList.remove("error","has-files","uploading"),x.style.display="none",w.style.width="0%",L.textContent="0%",m&&(m.textContent=""),h.reset(),document.querySelectorAll(".is-invalid, .valid").forEach(e=>{e.classList.remove("is-invalid","valid")}),document.querySelectorAll(".error-message").forEach(e=>{e.textContent="",e.style.display="none"}),o.disabled=!1,o.innerHTML='<i class="bi bi-send me-1"></i>Submit Material',g=!1}function E(){const e=new DataTransfer;i.forEach(s=>e.items.add(s)),c.files=e.files}function z(e,s){const t=new bootstrap.Modal(document.getElementById("filePreviewModal")),n=document.getElementById("filePreviewModalLabel"),l=document.getElementById("filePreviewContent"),d=document.getElementById("removeFileBtn");n.innerHTML='<i class="bi bi-file-earmark-check me-2"></i>File Confirmation & Preview';const b=q(e.type,e.name),I=e.size<=100*1024*1024?'<span class="badge bg-success">Size OK</span>':'<span class="badge bg-danger">Size Too Large</span>',p=O(e.name)?'<span class="badge bg-success">Format Supported</span>':'<span class="badge bg-warning">Format Not Supported</span>',_=`
            <div class="alert alert-primary border-0 mb-4">
                <div class="d-flex align-items-center">
                    <i class="bi bi-info-circle-fill fs-4 me-3"></i>
                    <div>
                        <h6 class="alert-heading mb-1">File Confirmation Required</h6>
                        <p class="mb-0">Please review the file details below and confirm if you want to keep this file for upload.</p>
                    </div>
                </div>
            </div>
        `,V=`
            <div class="card border-0 shadow-sm mb-4">
                <div class="card-header py-3">
                    <div class="d-flex align-items-center">
                        <i class="${b} fs-2 me-3 text-primary"></i>
                        <div class="flex-grow-1">
                            <h6 class="mb-1 fw-bold">${e.name}</h6>
                            <div class="d-flex gap-2 flex-wrap">
                                ${I}
                                ${p}
                                <span class="badge bg-info">File ${s+1} of ${i.length}</span>
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
                                <span class="fw-semibold">${y(e.name).toUpperCase()}</span>
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
        `;let f="";if(e.type==="application/pdf"){const r=URL.createObjectURL(e);f=`
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
            `}else e.type.includes("image/")?f=`
                <div class="card border-0 shadow-sm">
                    <div class="card-header">
                        <h6 class="mb-0"><i class="bi bi-image me-2"></i>Image Preview</h6>
                    </div>
                    <div class="card-body text-center">
                        <img src="${URL.createObjectURL(e)}" class="img-fluid rounded" alt="File preview" style="max-height: 400px;">
                    </div>
                </div>
            `:e.type.includes("text/")?f=`
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
            `:f=`
                <div class="card border-0 shadow-sm">
                    <div class="card-header bg-light">
                        <h6 class="mb-0"><i class="bi bi-file-earmark me-2"></i>File Information</h6>
                    </div>
                    <div class="card-body">
                        <div class="alert alert-info border-0 mb-0">
                            <div class="d-flex align-items-center">
                                <i class="bi bi-info-circle fs-4 me-3"></i>
                                <div>
                                    <h6 class="alert-heading mb-1">${R(e.name)}</h6>
                                    <p class="mb-0">Preview is not available for this file type, but it will be uploaded successfully if the format is supported.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;if(l.innerHTML=_+V+f,e.type.includes("text/")){const r=new FileReader;r.onload=function(N){const k=document.getElementById("textPreview");k&&(k.innerHTML=`<pre style="white-space: pre-wrap; margin: 0;">${N.target.result}</pre>`)},r.readAsText(e)}d.onclick=function(){Y(s),t.hide()},t.show()}function q(e,s){const t=y(s);return e==="application/pdf"||t==="pdf"?"bi bi-file-pdf-fill text-danger":e.includes("image/")?"bi bi-file-image-fill text-success":t==="docx"||t==="doc"?"bi bi-file-word-fill text-primary":t==="pptx"||t==="ppt"?"bi bi-file-ppt-fill text-warning":e.includes("text/")?"bi bi-file-text-fill text-info":"bi bi-file-earmark-fill text-secondary"}function y(e){return e.split(".").pop().toLowerCase()}function R(e){switch(y(e)){case"pdf":return"PDF Document";case"docx":case"doc":return"Microsoft Word Document";case"pptx":case"ppt":return"Microsoft PowerPoint Presentation";case"txt":return"Text Document";case"jpg":case"jpeg":case"png":case"gif":return"Image File";default:return"Unknown File Type"}}function O(e){const s=["pdf","docx","doc","pptx","ppt"],t=y(e);return s.includes(t)}function Y(e){i.splice(e,1),E(),u(i),M()}function u(e){if(e.length===0){v.style.display="none",a.classList.remove("has-files"),S.innerHTML=`
                <strong>Click to browse files</strong><br>
                or drag and drop your files here<br>
                <small>PDF, Word (.docx), PowerPoint (.pptx) • Max 100MB each</small>
            `;return}a.classList.add("has-files"),S.innerHTML=`<strong>${e.length} file(s) selected</strong>`,v.innerHTML=e.map((s,t)=>`
            <div class="file-item" data-file-index="${t}" title="Click to preview">
                <i class="bi bi-file-earmark text-primary"></i>
                <span class="flex-grow-1">${s.name}</span>
                <small class="text-muted">${(s.size/1024/1024).toFixed(2)} MB</small>
                <i class="bi bi-eye text-secondary ms-2"></i>
            </div>
        `).join(""),v.querySelectorAll(".file-item").forEach((s,t)=>{s.addEventListener("click",()=>{z(e[t],t)})}),v.style.display="block"}function M(){return c?(a.classList.remove("error"),m&&(m.textContent=""),i.length===0?(a.classList.add("error"),m&&(m.textContent="Please select at least one file."),u([]),!1):i.length>5?(alert("You can upload 5 files only."),i=i.slice(0,5),E(),u(i),!0):(u(i),!0)):!1}function $(){let e=!0;return C.forEach(s=>{const t=document.getElementById(s.id),n=document.getElementById(s.errorId);!t||!n||(t.value.trim()?(t.classList.remove("is-invalid"),t.classList.add("valid"),n.style.display="none"):(t.classList.add("is-invalid"),t.classList.remove("valid"),n.textContent=s.message,n.style.display="block",e=!1))}),M()||(e=!1),e}function D(e){const s=Array.from(e);if(i.length+s.length>5){const t=5-i.length;if(t>0)alert(`You can only add ${t} more file(s). Only the first ${t} file(s) will be added.`),i.push(...s.slice(0,t));else{alert("You have already selected 5 files. Please remove some files first.");return}}else i.push(...s);E(),u(i),M()}c?.addEventListener("change",e=>{e.target.files.length>0&&(F(),D(e.target.files))}),a?.addEventListener("click",e=>{!e.target.closest(".file-item")&&!e.target.closest(".file-upload-button")&&!e.target.closest("label")&&e.target!==c&&c.click()}),a?.addEventListener("dragover",e=>{e.preventDefault(),a.style.borderColor="#002855",a.style.background="#f8f9ff"}),a?.addEventListener("dragleave",e=>{e.preventDefault()}),a?.addEventListener("drop",e=>{e.preventDefault();const s=Array.from(e.dataTransfer.files);s.length>0&&(F(),D(s))}),o?.addEventListener("click",e=>{e.preventDefault(),$()&&T()}),h?.addEventListener("submit",e=>{e.preventDefault(),$()&&T()}),document.querySelectorAll("input, textarea, select").forEach(e=>{const s=document.getElementById(`${e.id}Error`);e.addEventListener("focus",()=>{e.classList.remove("is-invalid"),e.classList.add("valid"),s&&(s.style.display="none")}),e.addEventListener("blur",()=>{e.value.trim()?(e.classList.remove("is-invalid"),e.classList.add("valid"),s&&(s.style.display="none")):(e.classList.add("is-invalid"),e.classList.remove("valid"),s&&(s.style.display="block"))})}),j?.addEventListener("click",()=>{P()}),document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(e=>{new bootstrap.Tooltip(e)})});
