import { initials } from '../utilities.jsx'
import {
  idCardWrapperClass,
  idCardBodyClass,
  idPhotoClass,
  idInitialsClass,
  idListClass,
  idRowClass,
  idRowLastClass,
  idLabelClass,
  idValueClass,
} from '../styles/tailwindStyles.jsx'

function IdCard({ name, title, location, activeSince, photoUrl }) {
  return (
    <div className={idCardWrapperClass} style={{ animationDelay: '120ms' }}>
      <div className={idCardBodyClass}>
        {photoUrl ? (
          <img src={photoUrl} alt={name} className={idPhotoClass} />
        ) : (
          <div className={idInitialsClass}>{initials(name)}</div>
        )}
        <dl className={idListClass}>
          <div className={idRowClass}>
            <dt className={idLabelClass}>Role</dt>
            <dd className={idValueClass}>{title}</dd>
          </div>
          {location && (
            <div className={idRowClass}>
              <dt className={idLabelClass}>Location</dt>
              <dd className={idValueClass}>{location}</dd>
            </div>
          )}
          <div className={idRowLastClass}>
            <dt className={idLabelClass}>Active Since</dt>
            <dd className={idValueClass}>{activeSince}</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

export default IdCard
