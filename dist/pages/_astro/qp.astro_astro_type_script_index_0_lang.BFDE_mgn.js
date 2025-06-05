var d=(o,e)=>()=>(e||o((e={exports:{}}).exports,e),e.exports);var c=d((u,a)=>{class r{constructor(){this.selectedFiles=[],this.isSubmitting=!1,this.maxFiles=5,this.maxFileSize=100*1024*1024,this.allowedFormats=["pdf","docx","doc","pptx","ppt","txt"],this.init()}init(){this.cacheElements(),this.bindEvents(),this.initializeTooltips(),this.setupFormValidation()}cacheElements(){this.form=document.getElementById("py_quespaper"),this.fileInput=document.querySelector("#file"),this.fileUploadContainer=document.getElementById("fileUploadContainer"),this.fileUploadText=document.getElementById("fileUploadText"),this.fileList=document.getElementById("fileList"),this.submitButton=document.querySelector('button[type="submit"]'),this.resetButton=document.querySelector('button[type="reset"]'),this.validationFields=[{id:"subject",errorId:"subjectError",message:"Please select a subject."},{id:"semester",errorId:"semesterError",message:"Please select a semester."},{id:"title",errorId:"titleError",message:"Please enter a title."},{id:"file",errorId:"fileError",message:"Please upload at least one file."},{id:"fileDescription",errorId:"fileDescriptionError",message:"Please enter a file description."}]}bindEvents(){this.fileInput?.addEventListener("change",e=>this.handleFileSelection(e.target.files)),this.fileUploadContainer?.addEventListener("click",e=>this.handleContainerClick(e)),this.fileUploadContainer?.addEventListener("dragover",e=>this.handleDragOver(e)),this.fileUploadContainer?.addEventListener("dragleave",e=>this.handleDragLeave(e)),this.fileUploadContainer?.addEventListener("drop",e=>this.handleDrop(e)),this.form?.addEventListener("submit",e=>this.handleFormSubmit(e)),this.submitButton?.addEventListener("click",e=>this.handleSubmitClick(e)),this.resetButton?.addEventListener("click",()=>this.resetForm()),this.setupFieldValidation()}setupFieldValidation(){document.querySelectorAll("input, textarea, select").forEach(e=>{e.addEventListener("input",()=>this.validateField(e)),e.addEventListener("blur",()=>this.validateField(e)),e.addEventListener("focus",()=>this.clearFieldError(e))})}initializeTooltips(){typeof $<"u"&&$.fn.tooltip&&$('[data-toggle="tooltip"]').tooltip()}setupFormValidation(){this.validationFields.forEach(e=>{const t=document.getElementById(e.id);t&&t.setAttribute("data-validation-message",e.message)})}handleFileSelection(e){if(!e||e.length===0)return;this.showUploadProgress();const t=Array.from(e),i=this.filterValidFiles(t);i.length!==t.length&&this.showNotification("warning","Some files were skipped due to invalid format or size."),this.addFilesToSelection(i),this.hideUploadProgress()}filterValidFiles(e){return e.filter(t=>{const i=t.size<=this.maxFileSize,s=this.isValidFileFormat(t.name);return i?s?!0:(this.showNotification("error",`File "${t.name}" has an unsupported format.`),!1):(this.showNotification("error",`File "${t.name}" is too large. Maximum size is 100MB.`),!1)})}addFilesToSelection(e){const t=this.maxFiles-this.selectedFiles.length;if(e.length>t)if(t>0)this.showNotification("warning",`Only ${t} more files can be added.`),this.selectedFiles.push(...e.slice(0,t));else{this.showNotification("error","Maximum file limit reached. Please remove some files first.");return}else this.selectedFiles.push(...e);this.updateFileDisplay(),this.updateFileInput(),this.validateFileUpload()}removeFile(e){if(e>=0&&e<this.selectedFiles.length){const t=this.selectedFiles[e].name;this.selectedFiles.splice(e,1),this.updateFileDisplay(),this.updateFileInput(),this.validateFileUpload(),this.showNotification("info",`File "${t}" removed.`)}}updateFileDisplay(){if(this.selectedFiles.length===0){this.showEmptyState();return}this.showFilesState(),this.renderFileList()}showEmptyState(){this.fileUploadContainer?.classList.remove("has-files"),this.fileList.style.display="none",this.fileUploadText&&(this.fileUploadText.innerHTML=`
                <div class="text-center">
                    <i class="fas fa-cloud-upload-alt fa-2x text-muted mb-2"></i>
                    <div><strong>Click to browse files</strong></div>
                    <div class="text-muted">or drag and drop your files here</div>
                    <small class="text-muted">PDF, Word, PowerPoint, Text • Max 100MB each • Up to 5 files</small>
                </div>
            `)}showFilesState(){this.fileUploadContainer?.classList.add("has-files"),this.fileUploadText&&(this.fileUploadText.innerHTML=`
                <div class="text-center">
                    <i class="fas fa-check-circle text-success fa-2x mb-2"></i>
                    <div><strong>${this.selectedFiles.length} file(s) selected</strong></div>
                    <small class="text-muted">Click on files below to preview or remove</small>
                </div>
            `)}renderFileList(){this.fileList&&(this.fileList.innerHTML=this.selectedFiles.map((e,t)=>`
            <div class="file-item card card-outline card-primary mb-2" data-file-index="${t}">
                <div class="card-body p-3">
                    <div class="d-flex align-items-center">
                        <i class="${this.getFileIcon(e)} fa-lg text-primary me-3"></i>
                        <div class="flex-grow-1">
                            <div class="fw-bold">${this.truncateFileName(e.name,30)}</div>
                            <small class="text-muted">${this.formatFileSize(e.size)} • ${this.getFileExtension(e.name).toUpperCase()}</small>
                        </div>
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-outline-info" onclick="studyFormHandler.previewFile(${t})" title="Preview">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button type="button" class="btn btn-sm btn-outline-danger" onclick="studyFormHandler.removeFile(${t})" title="Remove">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join(""),this.fileList.style.display="block")}previewFile(e){if(e<0||e>=this.selectedFiles.length)return;const t=this.selectedFiles[e],i="filePreviewModal";this.createPreviewModal(i),this.populatePreviewModal(t,e),this.showModal(i)}createPreviewModal(e){if(document.getElementById(e))return;const t=`
            <div class="modal fade" id="${e}" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header bg-primary">
                            <h5 class="modal-title text-white">
                                <i class="fas fa-file-alt me-2"></i>File Preview
                            </h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body" id="previewModalBody">
                            <!-- Content will be populated dynamically -->
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-danger" id="removeFileFromPreview">
                                <i class="fas fa-trash me-1"></i>Remove File
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;document.body.insertAdjacentHTML("beforeend",t)}populatePreviewModal(e,t){const i=document.getElementById("previewModalBody"),s=document.getElementById("removeFileFromPreview");if(!i)return;const l=this.generateFileInfoHTML(e,t),n=this.generatePreviewContent(e);i.innerHTML=l+n,s.onclick=()=>{this.removeFile(t),this.hideModal("filePreviewModal")}}generateFileInfoHTML(e,t){return`
            <div class="card card-outline card-info mb-3">
                <div class="card-header">
                    <h6 class="card-title mb-0">
                        <i class="${this.getFileIcon(e)} me-2"></i>File Information
                    </h6>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                            <strong>Name:</strong> ${e.name}
                        </div>
                        <div class="col-md-6">
                            <strong>Size:</strong> ${this.formatFileSize(e.size)}
                        </div>
                        <div class="col-md-6">
                            <strong>Type:</strong> ${this.getFileExtension(e.name).toUpperCase()}
                        </div>
                        <div class="col-md-6">
                            <strong>Position:</strong> ${t+1} of ${this.selectedFiles.length}
                        </div>
                    </div>
                </div>
            </div>
        `}generatePreviewContent(e){const t=e.type,i=this.getFileExtension(e.name);return t==="application/pdf"||i==="pdf"?`
                <div class="card">
                    <div class="card-header">
                        <h6 class="card-title mb-0">PDF Preview</h6>
                    </div>
                    <div class="card-body p-0">
                        <iframe src="${URL.createObjectURL(e)}" style="width: 100%; height: 500px; border: none;"></iframe>
                    </div>
                </div>
            `:t.includes("image/")?`
                <div class="card">
                    <div class="card-header">
                        <h6 class="card-title mb-0">Image Preview</h6>
                    </div>
                    <div class="card-body text-center">
                        <img src="${URL.createObjectURL(e)}" class="img-fluid" style="max-height: 400px;" alt="Preview">
                    </div>
                </div>
            `:t.includes("text/")?`
                <div class="card">
                    <div class="card-header">
                        <h6 class="card-title mb-0">Text Preview</h6>
                    </div>
                    <div class="card-body">
                        <div id="textPreviewContent" class="bg-light p-3" style="max-height: 300px; overflow-y: auto; font-family: monospace;">
                            <div class="text-center">
                                <div class="spinner-border spinner-border-sm" role="status"></div>
                                <span class="ms-2">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            `:`
                <div class="alert alert-info">
                    <i class="fas fa-info-circle me-2"></i>
                    Preview not available for this file type. The file will be uploaded successfully.
                </div>
            `}handleFormSubmit(e){e.preventDefault(),this.validateForm()&&this.submitForm()}handleSubmitClick(e){e.preventDefault(),this.validateForm()&&this.submitForm()}async submitForm(){if(!this.isSubmitting){this.setSubmittingState(!0);try{await this.performSubmission(),this.showSubmissionSuccess()}catch(e){this.showSubmissionError(e)}finally{this.setSubmittingState(!1)}}}setSubmittingState(e){this.isSubmitting=e,this.submitButton&&(this.submitButton.disabled=e,this.submitButton.innerHTML=e?'<i class="fas fa-spinner fa-spin me-1"></i>Submitting...':'<i class="fas fa-paper-plane me-1"></i>Submit Material')}async performSubmission(){return this.collectFormData(),this.showSubmissionProgress(),new Promise((e,t)=>{setTimeout(()=>{Math.random()>.1?e({success:!0,submissionId:this.generateSubmissionId()}):t(new Error("Network error occurred. Please try again."))},3e3)})}collectFormData(){const e=new FormData(this.form);return e.delete("file"),this.selectedFiles.forEach((t,i)=>{e.append("files[]",t)}),e.append("submission_id",this.generateSubmissionId()),e.append("submission_timestamp",new Date().toISOString()),e.append("file_count",this.selectedFiles.length.toString()),e}validateForm(){let e=!0;return this.validationFields.forEach(t=>{this.validateField(document.getElementById(t.id))||(e=!1)}),this.validateFileUpload()||(e=!1),e}validateField(e){if(!e)return!0;const i=e.value.trim()!=="";return this.setFieldValidationState(e,i),i}validateFileUpload(){const e=this.selectedFiles.length>0,t=document.getElementById("fileError");return t&&(t.style.display=e?"none":"block",t.textContent=e?"":"Please upload at least one file."),this.fileUploadContainer&&this.fileUploadContainer.classList.toggle("is-invalid",!e),e}setFieldValidationState(e,t){const i=document.getElementById(`${e.id}Error`);e.classList.toggle("is-invalid",!t),e.classList.toggle("is-valid",t),i&&(i.style.display=t?"none":"block",t||(i.textContent=e.getAttribute("data-validation-message")||"This field is required."))}clearFieldError(e){e.classList.remove("is-invalid");const t=document.getElementById(`${e.id}Error`);t&&(t.style.display="none")}showNotification(e,t){if(typeof Swal<"u"){const i=e==="error"?"error":e==="warning"?"warning":"info";Swal.fire({icon:i,title:t,toast:!0,position:"top-end",showConfirmButton:!1,timer:3e3,timerProgressBar:!0})}else console.log(`${e.toUpperCase()}: ${t}`)}showUploadProgress(){const e=document.getElementById("uploadProgress");e&&(e.style.display="block")}hideUploadProgress(){setTimeout(()=>{const e=document.getElementById("uploadProgress");e&&(e.style.display="none")},500)}showSubmissionProgress(){this.createSubmissionModal(),this.showModal("submissionProgressModal")}showSubmissionSuccess(){this.hideModal("submissionProgressModal"),this.createSuccessModal(),this.showModal("submissionSuccessModal")}showSubmissionError(e){this.hideModal("submissionProgressModal"),this.showNotification("error",e.message||"An error occurred during submission.")}createSubmissionModal(){const e="submissionProgressModal";if(document.getElementById(e))return;const t=`
            <div class="modal fade" id="${e}" tabindex="-1" data-bs-backdrop="static">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header bg-primary border-0">
                            <h5 class="modal-title text-white">
                                <i class="fas fa-cloud-upload-alt me-2"></i>Submitting Form
                            </h5>
                        </div>
                        <div class="modal-body text-center">
                            <div class="spinner-border text-primary mb-3" role="status"></div>
                            <p>Please wait while we process your submission...</p>
                            <div class="progress">
                                <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: 100%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;document.body.insertAdjacentHTML("beforeend",t)}createSuccessModal(){const e="submissionSuccessModal";if(document.getElementById(e))return;const t=`
            <div class="modal fade" id="${e}" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header bg-success border-0">
                            <h5 class="modal-title text-white">
                                <i class="fas fa-check-circle me-2"></i>Submission Successful!
                            </h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="alert alert-success border-0">
                                <h6>Thank you for your contribution!</h6>
                                <p class="mb-0">Your study material has been submitted successfully and will be reviewed shortly.</p>
                            </div>
                            <div id="submissionSummary"></div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onclick="studyFormHandler.resetForm(); bootstrap.Modal.getInstance(document.getElementById('${e}')).hide();">
                                <i class="fas fa-plus me-1"></i>Submit Another
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;document.body.insertAdjacentHTML("beforeend",t)}handleContainerClick(e){!e.target.closest(".file-item")&&!e.target.closest("button")&&e.target!==this.fileInput&&this.fileInput?.click()}handleDragOver(e){e.preventDefault(),this.fileUploadContainer?.classList.add("drag-over")}handleDragLeave(e){e.preventDefault(),this.fileUploadContainer?.classList.remove("drag-over")}handleDrop(e){e.preventDefault(),this.fileUploadContainer?.classList.remove("drag-over");const t=e.dataTransfer.files;t.length>0&&this.handleFileSelection(t)}updateFileInput(){if(!this.fileInput)return;const e=new DataTransfer;this.selectedFiles.forEach(t=>e.items.add(t)),this.fileInput.files=e.files}resetForm(){this.selectedFiles=[],this.isSubmitting=!1,this.form?.reset(),this.updateFileDisplay(),this.clearAllValidationStates(),this.submitButton&&(this.submitButton.disabled=!1,this.submitButton.innerHTML='<i class="fas fa-paper-plane me-1"></i>Submit Material'),this.showNotification("info","Form has been reset.")}clearAllValidationStates(){document.querySelectorAll(".is-invalid, .is-valid").forEach(e=>{e.classList.remove("is-invalid","is-valid")}),document.querySelectorAll(".error-message").forEach(e=>{e.style.display="none"})}isValidFileFormat(e){const t=this.getFileExtension(e);return this.allowedFormats.includes(t)}getFileExtension(e){return e.split(".").pop().toLowerCase()}getFileIcon(e){switch(this.getFileExtension(e.name)){case"pdf":return"fas fa-file-pdf text-danger";case"doc":case"docx":return"fas fa-file-word text-primary";case"ppt":case"pptx":return"fas fa-file-powerpoint text-warning";case"txt":return"fas fa-file-alt text-info";default:return"fas fa-file text-secondary"}}formatFileSize(e){if(e===0)return"0 Bytes";const t=1024,i=["Bytes","KB","MB","GB"],s=Math.floor(Math.log(e)/Math.log(t));return parseFloat((e/Math.pow(t,s)).toFixed(2))+" "+i[s]}truncateFileName(e,t){if(e.length<=t)return e;const i=e.split(".").pop();return e.substring(0,e.lastIndexOf(".")).substring(0,t-i.length-4)+"..."+"."+i}generateSubmissionId(){const e=Date.now().toString(36),t=Math.random().toString(36).substr(2,5);return`SM-${e}-${t}`.toUpperCase()}showModal(e){const t=document.getElementById(e);t&&typeof bootstrap<"u"&&new bootstrap.Modal(t).show()}hideModal(e){const t=document.getElementById(e);if(t&&typeof bootstrap<"u"){const i=bootstrap.Modal.getInstance(t);i&&i.hide()}}}document.addEventListener("DOMContentLoaded",function(){window.studyFormHandler=new r});typeof a<"u"&&a.exports&&(a.exports=r)});export default c();
