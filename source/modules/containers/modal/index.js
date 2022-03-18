import $ from 'jquery';
import MicroModal from 'micromodal';
import { modalHandler } from '@/scripts/helpers/utils/modalHandler';
import { isFunction } from '@/scripts/helpers/utils/is';

const document = $('body');
export const lockClassName = 'scroll-locked';
export const modalAnimationDuration = 250;

export const microModalConfig = {
  disableScroll: false,
  awaitCloseAnimation: true,
  disableFocus: true,
  onShow: modal => {
    modalHandler(modal, 'playVideo');
    document.addClass(lockClassName);
    // disableBodyScroll(document);
  },
  onClose: modal => {
    modalHandler(modal, 'pauseVideo');
    setTimeout(() => {
      document.removeClass(lockClassName);
    }, modalAnimationDuration);
  },
};

export const showModalById = id => {
  const modal = $(`#${id}`);

  if (modal.length) {
    MicroModal.show(id, microModalConfig);
  }
};

export const showModalApiFail = () => {
  const modalId = 'popup-api-fail';
  const modal = $(`#${modalId}`);

  const renderPopupMarkup = () => `
      <div class="modal modal-animation-slide" id=${modalId} aria-hidden="true">
        <div class="modal__overlay" tabindex="-1" data-micromodal-close="data-micromodal-close" >
          <div class="modal__container" data-micromodal-close="data-micromodal-close">
            <div class="popup popup--api-fail">
              <button class="popup__close" data-micromodal-close="data-micromodal-close" aria-label="Close modal" tabindex="0"></button>
              <div class="popup__title">We’re sorry:(</div>
              <div class="popup__message">Something went wrong! We will be looking into this with the utmost urgency</div>
            </div>
          </div>
        </div>
      </div>
    `;

  if (!modal.length) {
    $('body').append(renderPopupMarkup());
  }

  showModalById('popup-api-fail');
};

// todo use custom texts
export const showModalApiSuccess = () => {
  const modalId = 'popup-api-success';
  const modal = $(`#${modalId}`);
  const renderPopupMarkup = () => `
      <div class="modal modal-animation-slide" id=${modalId} aria-hidden="true">
        <div class="modal__overlay" tabindex="-1" data-micromodal-close="data-micromodal-close" >
          <div class="modal__container" data-micromodal-close="data-micromodal-close">
            <div class="popup popup--api-success">
              <button class="popup__close" data-micromodal-close="data-micromodal-close" aria-label="Close modal" tabindex="0"></button>
              <div class="popup__title">Success!</div>
              <div class="popup__message">Thank you for your information</div>
            </div>
          </div>
        </div>
      </div>
    `;

  if (!modal.length) {
    $('body').append(renderPopupMarkup());
  }

  showModalById(modalId);
};

export const closeOpenModals = callback => {
  const openModals = $('.modal.is-open');

  openModals.each(function () {
    const closeTrigger = $(this)
      .find('[data-micromodal-close]')
      .first();
    // hack - for some reason unable to close modal programmatically by ID
    closeTrigger.trigger('click');
  });

  if (isFunction(callback)) {
    setTimeout((callback), modalAnimationDuration);
  }
};

const modalLoaderId = 'modal-loader';
export const startLoading = () => {
  const modal = $(`#${modalLoaderId}`);
  const renderLoaderMarkup = () => `
      <div class="modal modal--loader with-transparent-overlay" id=${modalLoaderId} aria-hidden="true">
        <div class="modal__overlay" tabindex="-1" data-micromodal-close="data-micromodal-close">
          <div class="loader" style="display: block">
            <svg id="colored--48--loader" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="100%" height="100%">
              <g fill="none" fill-rule="evenodd">
                  <path d="M48 24c0 13.255-10.745 24-24 24S0 37.255 0 24 10.745 0 24 0s24 10.745 24 24"></path>
                  <path fill="#F68F1E" d="M17.573 45.171c-2.08-.622-4.09-1.504-5.938-2.672A24.675 24.675 0 0 1 6.7 38.193a24.41 24.41 0 0 1-3.491-5.583c-.88-2.03-1.427-4.192-1.727-6.393a24.985 24.985 0 0 1 .202-6.654c.43-2.191 1.124-4.339 2.139-6.346A25.274 25.274 0 0 1 7.73 7.736a25.444 25.444 0 0 1 5.363-4.129c1.989-1.1 4.144-1.887 6.366-2.408C21.698.734 23.995.596 26.285.74c2.282.224 4.549.711 6.703 1.551a25.525 25.525 0 0 1 5.994 3.448 26.054 26.054 0 0 1 4.758 5.066c1.319 1.925 2.348 4.044 3.1 6.265.714 2.239 1.063 4.578 1.155 6.93a2.001 2.001 0 0 1-3.998.157 7.124 7.124 0 0 1-.002-.157c-.01-1.965-.218-3.935-.744-5.842-.564-1.891-1.36-3.72-2.42-5.406a22.689 22.689 0 0 0-3.912-4.502 22.48 22.48 0 0 0-5.08-3.188c-1.848-.803-3.815-1.304-5.821-1.584a22.966 22.966 0 0 0-6.072.173c-1.997.392-3.956 1.017-5.79 1.94a23.274 23.274 0 0 0-5.01 3.56 23.401 23.401 0 0 0-3.78 4.892c-1.008 1.816-1.727 3.782-2.21 5.811-.427 2.043-.556 4.145-.43 6.242.205 2.087.643 4.16 1.407 6.131a23.568 23.568 0 0 0 3.147 5.49 24.022 24.022 0 0 0 4.633 4.366c1.762 1.21 3.7 2.154 5.732 2.848 2.049.656 4.19.977 6.35 1.069-2.16-.009-4.326-.247-6.422-.829z"></path>
                  <path fill="#F68F1E" d="M17.573 45.171c-2.08-.622-4.09-1.504-5.938-2.672A24.675 24.675 0 0 1 6.7 38.193a24.41 24.41 0 0 1-3.491-5.583c-.88-2.03-1.427-4.192-1.727-6.393a24.985 24.985 0 0 1 .202-6.654c.43-2.191 1.124-4.339 2.139-6.346A25.274 25.274 0 0 1 7.73 7.736a25.444 25.444 0 0 1 5.363-4.129c1.989-1.1 4.144-1.887 6.366-2.408C21.698.734 23.995.596 26.285.74c2.282.224 4.549.711 6.703 1.551a25.525 25.525 0 0 1 5.994 3.448 26.054 26.054 0 0 1 4.758 5.066c1.319 1.925 2.348 4.044 3.1 6.265.714 2.239 1.063 4.578 1.155 6.93a2.001 2.001 0 0 1-3.998.157 7.124 7.124 0 0 1-.002-.157c-.01-1.965-.218-3.935-.744-5.842-.564-1.891-1.36-3.72-2.42-5.406a22.689 22.689 0 0 0-3.912-4.502 22.48 22.48 0 0 0-5.08-3.188c-1.848-.803-3.815-1.304-5.821-1.584a22.966 22.966 0 0 0-6.072.173c-1.997.392-3.956 1.017-5.79 1.94a23.274 23.274 0 0 0-5.01 3.56 23.401 23.401 0 0 0-3.78 4.892c-1.008 1.816-1.727 3.782-2.21 5.811-.427 2.043-.556 4.145-.43 6.242.205 2.087.643 4.16 1.407 6.131a23.568 23.568 0 0 0 3.147 5.49 24.022 24.022 0 0 0 4.633 4.366c1.762 1.21 3.7 2.154 5.732 2.848 2.049.656 4.19.977 6.35 1.069-2.16-.009-4.326-.247-6.422-.829z"></path>
              </g>
            </svg>
          </div>
        </div>
      </div>
    `;

  if (!modal.length) {
    $('body').append(renderLoaderMarkup());
  }

  showModalById(modalLoaderId);
};

export const finishLoading = () => {
  const modal = $(`#${modalLoaderId}`);

  if (modal.length) modal.remove();
};

export default () => {
  MicroModal.init(microModalConfig);
};
