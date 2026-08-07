const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'customer-dashboard.html');
let content = fs.readFileSync(filePath, 'utf8');

const brokenMarkup = `          </form>
          </div></div>
          <div class="col-lg-5"><div class="dash-panel"><h2 class="mb-3">Notifications</h2>`;

const fixedMarkup = `          </form>
        </div>
      </div>
      <div class="tab-pane fade" id="tabProfile" role="tabpanel">
        <div class="row g-3 g-xl-4">
          <div class="col-lg-7"><div class="dash-panel"><h2 class="mb-3">Profile and settings</h2>
            <form id="profileForm" class="needs-validation" novalidate><div class="row g-3">
              <div class="col-md-6"><label class="form-label" for="pfName">Full name</label><input class="form-control" id="pfName" value="Sofia Mendes" required><div class="invalid-feedback">Please enter your full name.</div></div>
              <div class="col-md-6"><label class="form-label" for="pfMail">Email</label><input type="email" class="form-control" id="pfMail" value="sofia@example.com" required><div class="invalid-feedback">Please enter a valid email address.</div></div>
              <div class="col-md-6"><label class="form-label" for="pfPhone">Phone</label><input type="tel" class="form-control" id="pfPhone" value="+1 800 555 0187" required><div class="invalid-feedback">Please enter your phone number.</div></div>
              <div class="col-md-6"><label class="form-label" for="pfAddr">Service address</label><input class="form-control" id="pfAddr" value="42 Willow Lane, Riverside" required><div class="invalid-feedback">Please enter your service address.</div></div>
              <div class="col-12"><label class="form-label" for="pfSchedule">Preferred cleaning schedule</label><select class="form-select" id="pfSchedule"><option>Weekly, Friday morning</option><option>Every two weeks</option><option>Monthly</option><option>As needed</option></select></div>
              <div class="col-12"><label class="form-label" for="pfNotes">Access and preferences</label><textarea class="form-control" id="pfNotes">Key safe code shared with office. Cat in the house, please keep the front door closed.</textarea></div>
              <div class="col-12"><button class="btn btn-brand" type="submit">Save profile</button></div>
              <div class="col-12"><div class="alert alert-success mb-0" role="status" tabindex="-1" data-form-alert hidden>Profile updated successfully.</div></div>
            </div></form>
          </div></div>
          <div class="col-lg-5"><div class="dash-panel"><h2 class="mb-3">Notifications</h2>`;

if (content.includes('</form>\r\n          </div></div>\r\n          <div class="col-lg-5"><div class="dash-panel"><h2 class="mb-3">Notifications</h2>')) {
    content = content.replace('</form>\r\n          </div></div>\r\n          <div class="col-lg-5"><div class="dash-panel"><h2 class="mb-3">Notifications</h2>', fixedMarkup);
} else if (content.includes('</form>\n          </div></div>\n          <div class="col-lg-5"><div class="dash-panel"><h2 class="mb-3">Notifications</h2>')) {
    content = content.replace('</form>\n          </div></div>\n          <div class="col-lg-5"><div class="dash-panel"><h2 class="mb-3">Notifications</h2>', fixedMarkup);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed customer-dashboard.html');
