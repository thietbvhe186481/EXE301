import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Eye, EyeOff, GraduationCap, BriefcaseBusiness, Route, Layers, BadgeCheck, LoaderCircle } from 'lucide-react';
import { apiService } from '../services/api';
import './AuthPage.css';

const initialValues = { role: 'student', name: '', email: '', password: '', confirmPassword: '', school: '', selectedMajorKey: 'dev', title: '', company: '', expertise: '', yearsExperience: '', profileUrl: '', bio: '', acceptedTerms: false, rememberMe: false };
const credentialKeys = ['name', 'email', 'password', 'confirmPassword'];

function Field({ name, label, errors, hint, children }) {
  return <div className="pf-auth-field">
    <label htmlFor={`pf-auth-${name}`}>{label}</label>
    {children}
    {errors[name] ? <span className="pf-auth-field-error" id={`pf-auth-${name}-error`}>{errors[name]}</span> : hint ? <span className="pf-auth-hint" id={`pf-auth-${name}-hint`}>{hint}</span> : null}
  </div>;
}

export function AuthPage({ authMode = 'login', setAuthMode, onAuthenticated, onOpenPolicy, go }) {
  const signup = authMode === 'signup';
  const [values, setValues] = useState(initialValues);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [visible, setVisible] = useState({});
  const formRef = useRef(null);
  const submitting = useRef(false);
  const mentor = values.role === 'mentor';

  useEffect(() => { setStep(1); setErrors({}); setMessage(''); setVisible({}); }, [authMode]);
  function update(name, value) {
    setValues(previous => ({ ...previous, [name]: value }));
    setErrors(previous => ({ ...previous, [name]: undefined }));
    setMessage('');
  }
  function focusError() {
    requestAnimationFrame(() => {
      const invalid = formRef.current?.querySelector('[aria-invalid="true"]');
      if (invalid) invalid.focus();
      else formRef.current?.querySelector('[role="alert"]')?.focus();
    });
  }
  function validate(profile = false) {
    const next = {};
    if (!values.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) next.email = 'Nhập địa chỉ email hợp lệ.';
    if (!values.password) next.password = 'Vui lòng nhập mật khẩu.';
    if (signup) {
      if (values.name.trim().length < 2) next.name = 'Nhập họ và tên có ít nhất 2 ký tự.';
      if (values.password.length < 8 || values.password.length > 72 || !/[\p{L}]/u.test(values.password) || !/\d/.test(values.password)) next.password = 'Mật khẩu cần 8–72 ký tự, gồm chữ và số.';
      else if (new TextEncoder().encode(values.password).length > 72) next.password = 'Mật khẩu vượt giới hạn 72 byte. Hãy rút ngắn nếu dùng ký tự có dấu.';
      if (!values.confirmPassword || values.confirmPassword !== values.password) next.confirmPassword = 'Mật khẩu xác nhận chưa khớp.';
      if (profile) {
        if (!mentor && !values.school.trim()) next.school = 'Nhập tên trường bạn đang theo học.';
        if (mentor) {
          if (!values.title.trim()) next.title = 'Nhập vị trí chuyên môn hiện tại.';
          if (!values.company.trim()) next.company = 'Nhập đơn vị công tác hoặc “Freelance”.';
          const expertise = values.expertise.split(',').map(item => item.trim()).filter(Boolean);
          if (!expertise.length) next.expertise = 'Nhập ít nhất một chuyên môn bạn có thể hướng dẫn.';
          else if (expertise.length > 15 || expertise.some(item => item.length > 80)) next.expertise = 'Tối đa 15 chuyên môn, mỗi chuyên môn không quá 80 ký tự.';
          const years = Number(values.yearsExperience);
          if (values.yearsExperience === '' || !Number.isInteger(years) || years < 0 || years > 60) next.yearsExperience = 'Nhập số năm kinh nghiệm là số nguyên từ 0 đến 60.';
          try { const url = new URL(values.profileUrl); if (!['https:', 'http:'].includes(url.protocol)) throw new Error(); } catch { next.profileUrl = 'Nhập đường dẫn hồ sơ đầy đủ, bắt đầu bằng https:// hoặc http://.'; }
        }
        if (!values.acceptedTerms) next.acceptedTerms = 'Bạn cần đồng ý với điều khoản và chính sách bảo mật.';
      }
    }
    return next;
  }
  async function submit(event) {
    event.preventDefault();
    if (submitting.current) return;
    const nextErrors = validate(step === 2);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      if (signup && credentialKeys.some(key => nextErrors[key])) setStep(1);
      focusError(nextErrors);
      return;
    }
    if (signup && step === 1) { setStep(2); requestAnimationFrame(() => formRef.current?.querySelector('input, select')?.focus()); return; }
    submitting.current = true;
    setBusy(true);
    setMessage('');
    try {
      const payload = { ...values, name: values.name.trim(), email: values.email.trim(), school: values.school.trim(), title: values.title.trim(), company: values.company.trim(), expertise: values.expertise.split(',').map(item => item.trim()).filter(Boolean), yearsExperience: Number(values.yearsExperience), profileUrl: values.profileUrl.trim(), bio: values.bio.trim() };
      const data = signup ? await apiService.register(payload) : await apiService.login({ email: payload.email, password: values.password, rememberMe: values.rememberMe });
      onAuthenticated(data);
    } catch (error) {
      const serverErrors = error.fieldErrors || {};
      setErrors(serverErrors);
      setMessage(error.message || 'Không thể kết nối. Vui lòng thử lại sau.');
      if (signup && credentialKeys.some(key => serverErrors[key])) setStep(1);
      focusError(serverErrors);
    } finally { submitting.current = false; setBusy(false); }
  }
  function input(name, label, options = {}) {
    const { hint, type = 'text', ...attributes } = options;
    const password = type === 'password';
    return <Field name={name} label={label} errors={errors} hint={hint}>
      <div className={password ? 'pf-auth-password' : undefined}>
        <input id={`pf-auth-${name}`} name={name} value={values[name]} type={password && visible[name] ? 'text' : type} onChange={event => update(name, event.target.value)} aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `pf-auth-${name}-error` : hint ? `pf-auth-${name}-hint` : undefined} {...attributes} />
        {password && <button type="button" className="pf-auth-reveal" aria-label={visible[name] ? `Ẩn ${label.toLowerCase()}` : `Hiện ${label.toLowerCase()}`} aria-pressed={!!visible[name]} onClick={() => setVisible(previous => ({ ...previous, [name]: !previous[name] }))}>{visible[name] ? <EyeOff size={18} /> : <Eye size={18} />}</button>}
      </div>
    </Field>;
  }
  const switchMode = () => { if (!busy) setAuthMode(signup ? 'login' : 'signup'); };

  return <section className="pf-auth" aria-label={signup ? 'Đăng ký tài khoản' : 'Đăng nhập'}>
    <aside className="pf-auth-story">
      <button className="pf-auth-home" type="button" onClick={() => go('home')}><ArrowLeft size={16} /> Về trang chủ</button>
      <div className="pf-auth-story-main">
        <span className="pf-auth-eyebrow"><span /> PORTFOLIO FPT HUB</span>
        <h1>Năng lực thật.<br /><em>Cơ hội mới.</em></h1>
        <p>Mỗi dự án là một bước tiến. Cùng xây dựng hồ sơ năng lực kể được câu chuyện của bạn.</p>
        <ol className="pf-auth-roadmap">
          <li><span className="pf-auth-roadmap-icon"><Route size={22} /></span><div><span className="pf-auth-step-number">01 / ĐỊNH HƯỚNG</span><h2>Chọn hướng đi</h2><p>Tìm lộ trình phù hợp với mục tiêu của bạn.</p></div></li>
          <li><span className="pf-auth-roadmap-icon"><Layers size={22} /></span><div><span className="pf-auth-step-number">02 / THỰC HÀNH</span><h2>Làm dự án</h2><p>Thử sức với thử thách, nhận góp ý từ mentor.</p></div></li>
          <li><span className="pf-auth-roadmap-icon"><BadgeCheck size={22} /></span><div><span className="pf-auth-step-number">03 / THỂ HIỆN</span><h2>Xây hồ sơ</h2><p>Biến sản phẩm thực tế thành dấu ấn riêng.</p></div></li>
        </ol>
      </div>
      <div className="pf-auth-story-footer"><span>Developer</span><span>Marketing</span><span>Designer</span></div>
    </aside>

    <div className="pf-auth-form-panel">
      <div className="pf-auth-mode-nav"><span>{signup ? 'Đã có tài khoản?' : 'Mới đến Portfolio FPT Hub?'}</span><button type="button" disabled={busy} onClick={switchMode}>{signup ? 'Đăng nhập' : 'Tạo tài khoản'} <ArrowRight size={15} /></button></div>
      <div className="pf-auth-form-wrap">
        <header className="pf-auth-heading">
          <span className="pf-auth-kicker">{signup ? 'BẮT ĐẦU HÀNH TRÌNH' : 'TIẾP TỤC HÀNH TRÌNH'}</span>
          <h2>{signup ? step === 1 ? 'Bạn muốn tham gia với vai trò nào?' : mentor ? 'Chia sẻ chuyên môn của bạn.' : 'Làm quen một chút nhé.' : 'Chào mừng bạn trở lại.'}</h2>
          <p>{signup ? step === 1 ? 'Một tài khoản để học hỏi, thực hành và cùng phát triển.' : mentor ? 'Thông tin này giúp kết nối bạn với những bài thực hành đúng chuyên môn.' : 'Chọn lĩnh vực quan tâm để bắt đầu xây dựng lộ trình nghề nghiệp.' : 'Đăng nhập để tiếp tục lộ trình, dự án và những kết nối của bạn.'}</p>
        </header>
        {signup && <div className="pf-auth-progress" aria-label={`Bước ${step} trên 2`}><span className="is-active"><i>{step === 2 ? <Check size={12} /> : '1'}</i>Tài khoản</span><b /><span className={step === 2 ? 'is-active' : ''}><i>2</i>Hồ sơ {mentor ? 'mentor' : 'sinh viên'}</span></div>}
        <form ref={formRef} onSubmit={submit} noValidate>
          {message && <div className="pf-auth-alert" role="alert" tabIndex={-1}>{message}</div>}
          <fieldset disabled={busy} className="pf-auth-fields">
            {signup && step === 1 && <div className="pf-auth-roles" role="group" aria-label="Chọn vai trò">
              {[['student', GraduationCap, 'Sinh viên', 'Học qua dự án thực tế'], ['mentor', BriefcaseBusiness, 'Mentor', 'Chia sẻ kinh nghiệm']].map(([role, Icon, title, subtitle]) => <button key={role} type="button" aria-pressed={values.role === role} className={values.role === role ? 'is-selected' : ''} onClick={() => update('role', role)}><Icon size={23} /><strong>{title}</strong><span>{subtitle}</span>{values.role === role && <Check size={15} className="pf-auth-role-check" />}</button>)}
            </div>}
            {(!signup || step === 1) && <>
              {signup && input('name', 'Họ và tên', { autoComplete: 'name', placeholder: 'Nguyễn Minh Anh', maxLength: 100 })}
              {input('email', 'Email', { type: 'email', autoComplete: 'email', placeholder: 'ban@example.com', maxLength: 254 })}
              {input('password', 'Mật khẩu', { type: 'password', autoComplete: signup ? 'new-password' : 'current-password', placeholder: signup ? 'Tạo mật khẩu của bạn' : 'Nhập mật khẩu', ...(signup ? { maxLength: 72, hint: '8–72 ký tự, bao gồm chữ và số.' } : {}) })}
              {signup && input('confirmPassword', 'Xác nhận mật khẩu', { type: 'password', autoComplete: 'new-password', placeholder: 'Nhập lại mật khẩu', maxLength: 72 })}
              {!signup && <label className="pf-auth-checkbox"><input type="checkbox" checked={values.rememberMe} onChange={event => update('rememberMe', event.target.checked)} /> Ghi nhớ đăng nhập</label>}
            </>}
            {signup && step === 2 && <>
              <Field name="selectedMajorKey" label={mentor ? 'Lĩnh vực hướng dẫn' : 'Lĩnh vực quan tâm'} errors={errors}><select id="pf-auth-selectedMajorKey" value={values.selectedMajorKey} onChange={event => update('selectedMajorKey', event.target.value)} aria-invalid={!!errors.selectedMajorKey} aria-describedby={errors.selectedMajorKey ? 'pf-auth-selectedMajorKey-error' : undefined}><option value="dev">Công nghệ thông tin / Developer</option><option value="mkt">Marketing</option><option value="design">Thiết kế / Designer</option></select></Field>
              {mentor ? <>
                <div className="pf-auth-field-grid">{input('title', 'Vị trí chuyên môn', { placeholder: 'VD: Frontend Developer', maxLength: 120 })}{input('company', 'Đơn vị công tác', { placeholder: 'Tên công ty hoặc Freelance', autoComplete: 'organization', maxLength: 150 })}</div>
                {input('expertise', 'Chuyên môn hướng dẫn', { placeholder: 'VD: React, JavaScript, UI/UX', maxLength: 500, hint: 'Ngăn cách các chuyên môn bằng dấu phẩy.' })}
                {input('yearsExperience', 'Số năm kinh nghiệm', { type: 'number', min: 0, max: 60, step: '1', placeholder: 'VD: 3' })}
                {input('profileUrl', 'Đường dẫn hồ sơ chuyên môn', { type: 'url', placeholder: 'https://www.linkedin.com/in/...', maxLength: 500, hint: 'LinkedIn, GitHub, Behance hoặc website portfolio của bạn.' })}
              </> : input('school', 'Trường đang theo học', { placeholder: 'VD: Đại học FPT', autoComplete: 'organization', maxLength: 150 })}
              <div className="pf-auth-consent"><label className="pf-auth-checkbox"><input id="pf-auth-acceptedTerms" type="checkbox" checked={values.acceptedTerms} onChange={event => update('acceptedTerms', event.target.checked)} aria-invalid={!!errors.acceptedTerms} aria-describedby={errors.acceptedTerms ? 'pf-auth-acceptedTerms-error' : undefined} /><span>Tôi đồng ý với <button type="button" onClick={() => onOpenPolicy('terms')}>Điều khoản sử dụng</button> và <button type="button" onClick={() => onOpenPolicy('privacy')}>Chính sách bảo mật</button> của Portfolio FPT Hub.</span></label>{errors.acceptedTerms && <span className="pf-auth-field-error" id="pf-auth-acceptedTerms-error">{errors.acceptedTerms}</span>}</div>
            </>}
            <button type="submit" className="pf-auth-submit">{busy ? <><LoaderCircle size={19} className="pf-auth-spinner" />{signup ? 'Đang tạo tài khoản…' : 'Đang đăng nhập…'}</> : <>{signup ? step === 1 ? 'Tiếp tục' : `Tạo tài khoản ${mentor ? 'mentor' : 'sinh viên'}` : 'Đăng nhập'}<ArrowRight size={18} /></>}</button>
            {signup && step === 2 && <button type="button" className="pf-auth-back" onClick={() => { setStep(1); setMessage(''); }}><ArrowLeft size={15} /> Quay lại thông tin tài khoản</button>}
          </fieldset>
          <p className="pf-auth-footnote">{signup ? 'Bắt đầu với tài khoản miễn phí.' : 'Dành cho sinh viên, mentor và quản trị viên.'}</p>
        </form>
      </div>
    </div>
  </section>;
}
