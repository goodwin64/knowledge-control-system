function onload(){for(var e=document.getElementById("submit-questions-number"),t=document.getElementById("questions-number"),n=document.getElementsByClassName("change-questions-number"),i=0;i<n.length;i++)n[i].onclick=function(){var e=+t.value+ +this.value;e>=+t.getAttribute("min")&&e<=+t.getAttribute("max")?t.value=e:alert("Questions count is a positive number l.t. 51!")};e.addEventListener("click",onSubmitQuestionsNumber),t.addEventListener("keyup",function(e){e.preventDefault(),13==e.keyCode&&document.getElementById("submit-questions-number").click()}),fillTestFooter(),e.click()}function onSubmitQuestionsNumber(){var e=document.getElementById("test-creation-body"),t=document.getElementById("questions-number"),n=e.childElementCount,i=+t.value;if(!(i<+t.min||i>+t.max)){if(i>n)for(var r=n+1;r<=i;r++)e.appendChild(generateQuestionsDiv(r));else for(r=0;r<n-i;r++)e.removeChild(e.lastElementChild);var o=document.getElementById("test-creation-after");o.removeAttribute("hidden")}}function generateQuestionsDiv(e){var t=document.createElement("div");t.className+=" question-wrapper";var n=document.createElement("div");n.className+=" question-content";var i=document.createElement("div");i.className+=" question-head-wrapper";var r=document.createElement("h3");r.innerText="Question №"+e,i.appendChild(r);var o=generateQuestionTypeSelector(["one-option","multi-option"]);i.appendChild(o),n.appendChild(i);var a=generateQuestionTitle("Question title");n.appendChild(a);var l=document.createElement("div");l.className+=" options-wrapper";const u=3,c=10;for(var d=1;d<=u;d++){var s=generateOptionDiv(e,d);l.appendChild(s)}n.appendChild(l);var p=document.createElement("div");p.className+=" option-add-wrapper";var m=document.createElement("input");return m.setAttribute("type","button"),m.value="+",m.className+=" option-add",p.appendChild(m),n.appendChild(p),m.addEventListener("click",function(){if(l.childElementCount<c){var e=Array.prototype.slice.call(t.parentNode.children),n=e.indexOf(t)+1,i=m.parentNode.previousElementSibling.children.length+1;l.appendChild(generateOptionDiv(n,i,getInputTypeFromSelect(o.value)))}else alert("Too many options, max 10")}),t.appendChild(n),t}function generateOptionDiv(e,t,n){n=n||"radio";var i=document.createElement("div");i.className+=" option-wrapper";var r=document.createElement("input");r.setAttribute("type",n),r.name="option-button-"+e,r.className+=" option-select";var o=document.createElement("input");o.setAttribute("type","text"),o.setAttribute("name","option-"+e+"-"+t),o.setAttribute("placeholder","e.g. option "+t),o.className+=" option-content";var a=document.createElement("input");return a.setAttribute("type","button"),a.value="x",a.className+=" option-delete",a.addEventListener("click",function(){var e=i.parentNode;e.children.length>1?(e.removeChild(i),rewriteChildrenPlaceholders(e,"e.g. option ")):alert("At least 1 option")}),i.appendChild(r),i.appendChild(o),i.appendChild(a),i}function generateQuestionTypeSelector(e){for(var t=document.createElement("select"),n=0;n<e.length;n++){var i=document.createElement("option");i.innerText=e[n],t.appendChild(i)}return t.onchange=function(){setOptionsTo(this,getInputTypeFromSelect(this.value))},t}function setOptionsTo(e,t){var n=e.parentNode.parentNode.querySelector(".options-wrapper").children;if(n&&n[0].getAttribute("type")!=t)for(var i=0;i<n.length;i++)n[i].className.indexOf("option-wrapper")!=-1&&n[i].querySelector("input").setAttribute("type",t)}function fillTestFooter(){var e=document.getElementById("test-submit");e.addEventListener("click",function(){return sendTestData("/tests",!0),!1});var t=document.getElementById("test-cancel");t.addEventListener("click",function(){});var n=document.getElementById("test-save-draft");n.addEventListener("click",function(){})}function generateQuestionTitle(e){var t=document.createElement("input");t.setAttribute("type","text"),t.setAttribute("placeholder",e||"Question title");var n=document.createElement("div");return n.className+=" question-title-wrapper",n.appendChild(t),n}function rewriteChildrenPlaceholders(e,t){t=t||"e.g. option ";for(var n=1;n<=e.children.length;n++){var i=e.children[n-1].querySelector("input[type='text']");i.setAttribute("placeholder",t+n)}}function getInputTypeFromSelect(e){switch(e){case"one-option":return"radio";case"multi-option":return"checkbox";default:return null}}function getQuestionTypeForJSON(e){switch(e){case"one-option":return 1;case"multi-option":return 2;default:return null}}