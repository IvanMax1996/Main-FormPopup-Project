'use strict'

const bodyElement = document.querySelector('body')
const filterAbsoluteContainerElement = document.querySelector('.filter-area-desktop')
const filterWrapperElement = document.querySelector('.filter__wrapper')
const filterAllButtonIconElements = document.querySelectorAll('.form-slider__button-icon')
const filterAllButtonItemElements = document.querySelectorAll('.form-slider__button')
const filterAllDropdownWrapElements = document.querySelectorAll('.form-slider__dropdown')
const filterPopupWrapperElement = document.querySelector('.filter-popup__wrapper')
const filterPopupInnerElement = document.querySelector('.filter-popup__inner')
const filterPopupAbsoluteContainerElement = document.querySelector('.filter-popup')
const filterPopupAllItemElements = document.querySelectorAll('.form-popup__item')

let filterSliderOffset = false

filterWrapperElement.style.width = '100%'

// <<<<<------------------------------------------------------------------>>>>>

const settingDropdownMaxHeight = (filterDropdownIndex) => {
  const isDropdownVisible = filterAllDropdownWrapElements[filterDropdownIndex].classList.contains('visible-block')

  if (isDropdownVisible) {
    filterAllDropdownWrapElements[filterDropdownIndex].style.maxHeight = '150px'
  } else {
    filterAllDropdownWrapElements[filterDropdownIndex].style.maxHeight = '0'
  }
}

const changeButtonIconRotate = () => {
  filterAllButtonIconElements.forEach((btnIconItem) => {
    btnIconItem.classList.remove('form-slider__button-icon--rotate')
  })
}

const checkedFilterRadioInput = (allFilterPopupRadioInput, allFilterRadioInput) => {
  allFilterRadioInput.forEach((radioInputItem) => {
    radioInputItem.nextElementSibling.classList.remove('form-slider__input-radio--box-shadow')
  })

  allFilterPopupRadioInput.forEach((itemRadioInputPopup, indexRadioInputPopup) => {
    if (itemRadioInputPopup.checked === true) {
      allFilterRadioInput[indexRadioInputPopup].click()

      if (allFilterRadioInput[indexRadioInputPopup].type === 'radio') {
        allFilterRadioInput[indexRadioInputPopup].nextElementSibling.classList.add(
          'form-slider__input-radio--box-shadow'
        )
      }
    }
  })
}

// <<<<<------------------------------------------------------------------>>>>>

/* ------------------------------------------------------------------------ */
// События открытия и закрытия dropDown
/* ------------------------------------------------------------------------ */

filterAllButtonItemElements.forEach((itemFilterButton, indexFilterButton) => {
  itemFilterButton.addEventListener('mouseup', () => {
    if (filterSliderOffset) return

    const windowWidth = document.documentElement.clientWidth

    if (windowWidth <= 768) {
      bodyElement.style.position = 'fixed'
      filterPopupAllItemElements[indexFilterButton].style.display = 'block'

      filterPopupAbsoluteContainerElement.classList.add('visible-block')
      filterPopupAbsoluteContainerElement.classList.add('overscroll-browser-reset')

      filterPopupWrapperElement.style.maxHeight = filterPopupInnerElement.scrollHeight + 'px'
      filterPopupWrapperElement.style.transform = 'translateY(0px)'
      filterPopupWrapperElement.style.opacity = '1'
    } else {
      filterAbsoluteContainerElement.style.display = 'block'

      filterAllDropdownWrapElements.forEach((itemDropdown, indexDropDown) => {
        if (indexFilterButton !== indexDropDown) {
          filterAllDropdownWrapElements[indexDropDown].classList.remove('visible-block')
        }

        settingDropdownMaxHeight(indexDropDown)
      })

      filterAllDropdownWrapElements[indexFilterButton].classList.toggle('visible-block')

      settingDropdownMaxHeight(indexFilterButton)
    }

    filterAllButtonIconElements.forEach((itemButtonIcon, indexButtonIcon) => {
      if (indexFilterButton !== indexButtonIcon) {
        filterAllButtonIconElements[indexButtonIcon].classList.remove(
          'form-slider__button-icon--rotate'
        )
      }
    })

    filterAllButtonIconElements[indexFilterButton].classList.toggle(
      'form-slider__button-icon--rotate'
    )
  })
})

filterAbsoluteContainerElement.addEventListener('click', (e) => {
  filterAllDropdownWrapElements.forEach((itemDropdown, indexDropdown) => {
    if (e.target !== itemDropdown) {
      filterAbsoluteContainerElement.style.display = 'none'
      itemDropdown.classList.remove('visible-block')

      settingDropdownMaxHeight(indexDropdown)
      changeButtonIconRotate()
    }
  })
})

filterPopupAbsoluteContainerElement.addEventListener('click', (e) => {
  if (e.target === filterPopupAbsoluteContainerElement) {
    filterPopupAllItemElements.forEach((itemFilterPopup) => {
      itemFilterPopup.style.display = 'none'
    })

    bodyElement.style.position = 'static'
    filterPopupWrapperElement.style.maxHeight = '0'
    filterPopupAbsoluteContainerElement.classList.remove('visible-block')
    filterPopupAbsoluteContainerElement.classList.remove('overscroll-browser-reset')

    changeButtonIconRotate()
  }
})

/* ------------------------------------------------------------------------ */
// События открытия и закрытия dropDown
/* ------------------------------------------------------------------------ */

// <<<<<------------------------------------------------------------------>>>>>

/* ------------------------------------------------------------------------ */
// События range slider
/* ------------------------------------------------------------------------ */

const rangeSliderGap = 1000
const priceAllInputFilterElements = document.querySelectorAll(
  '.form-slider__input-number-box input'
)
const rangeAllInputFilterElements = document.querySelectorAll('.form-slider__input-range-box input')
const rangeFilterSliderElement = document.querySelector('.form-slider__range')
const rangeFilterSliderProgressElement = document.querySelector(
  '.form-slider__range-progress'
)
const priceAllInputFilterPopupElements = document.querySelectorAll(
  '.form-popup__input-number-box-popup input'
)
const rangeAllInputFilterPopupElements = document.querySelectorAll(
  '.form-popup__input-range-box-popup input'
)
const rangeFilterSliderPopupElement = document.querySelector('.form-popup__range-popup')
const rangeFilterSliderProgressPopupElement = document.querySelector(
  '.form-popup__range-progress-popup'
)
const filterButtonInfoPopup4Element = document.querySelector('.form-popup__btn-info-4')

rangeFilterSliderProgressElement.style.left = '0%'
rangeFilterSliderProgressPopupElement.style.left = '0%'

priceAllInputFilterElements.forEach((priceInputItem) => {
  priceInputItem.addEventListener('change', () => {
    priceAllInputFilterElements.forEach((priceInputItem) => {
      priceInputItem.value = +priceInputItem.value
    })

    for (const [] of searchParams.entries()) {
      searchParams.delete('price')
    }

    const currentForm = new FormData(formElement)

    const arrayKeysForm = currentForm.getAll('price-num')

    if (arrayKeysForm[1] <= 1000) {
      arrayKeysForm[1] = 1000
    } else if (arrayKeysForm[1] >= 10000) {
      arrayKeysForm[1] = 10000
    }

    if (arrayKeysForm[0] <= 0) {
      arrayKeysForm[0] = 0
    } else if (arrayKeysForm[0] >= 9000) {
      arrayKeysForm[0] = 9000
    }

    let minPrice = parseInt(priceAllInputFilterElements[0].value)
    let maxPrice = parseInt(priceAllInputFilterElements[1].value)

    if (minPrice >= 9000) {
      priceAllInputFilterElements[0].value = 9000
      priceAllInputFilterElements[1].value = 10000

      rangeAllInputFilterElements[0].value = 9000
      rangeAllInputFilterElements[1].value = 10000

      rangeFilterSliderProgressElement.style.left =
        (9000 / rangeAllInputFilterElements[0].max) * 100 + '%'
      rangeFilterSliderProgressElement.style.right =
        100 - (10000 / rangeAllInputFilterElements[1].max) * 100 + '%'
    }

    if (maxPrice >= 10000) {
      priceAllInputFilterElements[1].value = 10000
    } else if (maxPrice <= 0 || (maxPrice >= 0 && maxPrice <= 1000)) {
      priceAllInputFilterElements[1].value = 1000
    }

    if (maxPrice - minPrice >= rangeSliderGap) {
      rangeAllInputFilterElements[0].value = minPrice
      rangeFilterSliderProgressElement.style.left =
        (minPrice / rangeAllInputFilterElements[0].max) * 100 + '%'

      rangeAllInputFilterElements[1].value = maxPrice
      rangeFilterSliderProgressElement.style.right =
        100 - (maxPrice / rangeAllInputFilterElements[1].max) * 100 + '%'
    } else if (minPrice <= 9000) {
      priceAllInputFilterElements[1].value = minPrice + rangeSliderGap
      rangeAllInputFilterElements[1].value = minPrice + rangeSliderGap
      arrayKeysForm[1] = priceAllInputFilterElements[1].value

      rangeFilterSliderProgressElement.style.right =
        100 -
        (rangeAllInputFilterElements[1].value / rangeAllInputFilterElements[1].max) * 100 +
        '%'
    }

    if (minPrice <= 0) {
      priceAllInputFilterElements[0].value = 0
      rangeAllInputFilterElements[0].value = 0

      rangeFilterSliderProgressElement.style.left = '0%'
    }

    if (maxPrice > 10000) {
      priceAllInputFilterElements[1].value = 10000
      rangeAllInputFilterElements[1].value = 10000

      rangeFilterSliderProgressElement.style.right = '0%'
    }

    if (
      priceAllInputFilterElements[0].value >= 0 &&
      priceAllInputFilterElements[0].value <= 9000 &&
      priceAllInputFilterElements[1].value >= 1000 &&
      priceAllInputFilterElements[1].value <= 10000
    ) {
      filterItemButton4Element.classList.add('form-slider__button--active')
      filterItemButtonIcon4Element.style.color = 'white'
      filterItemButtonReset4Element.classList.add('form-slider__button-reset--active')
    } else {
      filterItemButton4Element.classList.remove('form-slider__button--active')
      filterItemButtonIcon4Element.style.color = ''
      filterItemButtonReset4Element.classList.remove('form-slider__button-reset--active')
    }

    arrayKeysForm.forEach((keyFormItem) => {
      searchParams.append('price', keyFormItem)
    })
  })
})

rangeAllInputFilterElements.forEach((rangeInputItem) => {
  rangeInputItem.addEventListener('input', () => {
    const currentForm = new FormData(formElement)

    for (const [] of searchParams.entries()) {
      searchParams.delete('price')
    }

    const arrayKeysForm = currentForm.getAll('price')

    if (arrayKeysForm[1] <= 1000) {
      arrayKeysForm[1] = 1000
    }

    if (arrayKeysForm[0] >= 9000) {
      arrayKeysForm[0] = 9000
    }

    arrayKeysForm.forEach((keyFormItem) => {
      searchParams.append('price', keyFormItem)
    })

    let minVal = parseInt(rangeAllInputFilterElements[0].value)
    let maxVal = parseInt(rangeAllInputFilterElements[1].value)

    priceAllInputFilterElements[0].value = minVal
    priceAllInputFilterElements[1].value = maxVal

    if (maxVal - minVal <= rangeSliderGap) {
      rangeAllInputFilterElements[0].value = maxVal - rangeSliderGap
      rangeAllInputFilterElements[1].value = minVal + rangeSliderGap
    } else {
      rangeFilterSliderProgressElement.style.left =
        (minVal / rangeAllInputFilterElements[0].max) * 100 + '%'
      rangeFilterSliderProgressElement.style.right =
        100 - (maxVal / rangeAllInputFilterElements[1].max) * 100 + '%'
    }

    if (minVal === 0 && maxVal <= 1000) {
      priceAllInputFilterElements[0].value = 0
      priceAllInputFilterElements[1].value = 1000

      rangeFilterSliderProgressElement.style.left = '0%'
      rangeFilterSliderProgressElement.style.right = '90%'
    } else if (minVal >= 9000 && maxVal === 10000) {
      priceAllInputFilterElements[0].value = 9000
      priceAllInputFilterElements[1].value = 10000
      rangeFilterSliderProgressElement.style.left = '90%'
      rangeFilterSliderProgressElement.style.right = '0%'
    } else {
      rangeFilterSliderProgressElement.style.left =
        (minVal / rangeAllInputFilterElements[0].max) * 100 + '%'
      rangeFilterSliderProgressElement.style.right =
        100 - (maxVal / rangeAllInputFilterElements[1].max) * 100 + '%'
    }

    if (
      rangeAllInputFilterElements[0].value >= 0 &&
      rangeAllInputFilterElements[0].value <= 9000 &&
      rangeAllInputFilterElements[1].value >= 1000 &&
      rangeAllInputFilterElements[1].value <= 10000
    ) {
      filterItemButton4Element.classList.add('form-slider__button--active')
      filterItemButtonIcon4Element.style.color = 'white'
      filterItemButtonReset4Element.classList.add('form-slider__button-reset--active')
    } else {
      filterItemButton4Element.classList.remove('form-slider__button--active')
      filterItemButtonIcon4Element.style.color = ''
      filterItemButtonReset4Element.classList.remove('form-slider__button-reset--active')
    }
  })
})

rangeFilterSliderElement.addEventListener('click', (e) => {
  const rangeFilterSliderWidth = rangeFilterSliderElement.scrollWidth

  if (e.target === e.currentTarget) {
    const rangeFilterSliderOffset = Math.ceil((e.layerX / rangeFilterSliderWidth) * 100)

    if (rangeFilterSliderOffset > priceAllInputFilterElements[1].value / 100) {
      const maxValue = rangeFilterSliderOffset * 100

      priceAllInputFilterElements[1].value = maxValue
      rangeAllInputFilterElements[1].value = maxValue
      rangeFilterSliderProgressElement.style.right = 100 - rangeFilterSliderOffset + '%'
    } else {
      const minValue = rangeFilterSliderOffset * 100

      priceAllInputFilterElements[0].value = minValue
      rangeAllInputFilterElements[0].value = minValue
      rangeFilterSliderProgressElement.style.left = rangeFilterSliderOffset + '%'
    }
  } else {
    const rangeFilterSliderProgressOffset = parseInt(e.target.style.left)
    const rangeFilterSliderOffset = (e.layerX / rangeFilterSliderWidth) * 100
    const finalSliderOffset = Math.ceil(rangeFilterSliderProgressOffset + rangeFilterSliderOffset)

    if (finalSliderOffset <= 50) {
      const minValue = finalSliderOffset * 100

      priceAllInputFilterElements[0].value = minValue
      rangeAllInputFilterElements[0].value = minValue
      rangeFilterSliderProgressElement.style.left = finalSliderOffset + '%'
    } else {
      const rangeSliderRightOffset = finalSliderOffset
      const maxValue = rangeSliderRightOffset * 100

      priceAllInputFilterElements[1].value = maxValue
      rangeAllInputFilterElements[1].value = maxValue
      rangeFilterSliderProgressElement.style.right = 100 - rangeSliderRightOffset + '%'
    }
  }

  const currentForm = new FormData(formElement)

  for (const [] of searchParams.entries()) {
    searchParams.delete('price')
  }

  const arrayKeysForm = currentForm.getAll('price-num')

  arrayKeysForm.forEach((keyFormItem) => {
    searchParams.append('price', keyFormItem)
  })

  if (
    rangeAllInputFilterElements[0].value >= 0 &&
    rangeAllInputFilterElements[0].value <= 9000 &&
    rangeAllInputFilterElements[1].value >= 1000 &&
    rangeAllInputFilterElements[1].value <= 10000
  ) {
    filterItemButton4Element.classList.add('form-slider__button--active')
    filterItemButtonIcon4Element.style.color = 'white'
    filterItemButtonReset4Element.classList.add('form-slider__button-reset--active')
  } else {
    filterItemButton4Element.classList.remove('form-slider__button--active')
    filterItemButtonIcon4Element.style.color = ''
    filterItemButtonReset4Element.classList.remove('form-slider__button-reset--active')
  }

  filterButtonSubmitElement.click()
})

priceAllInputFilterPopupElements.forEach((priceInputItemPopup) => {
  priceInputItemPopup.addEventListener('change', () => {
    priceAllInputFilterPopupElements.forEach((priceInputItemPopup) => {
      priceInputItemPopup.value = +priceInputItemPopup.value
    })

    const currentForm = new FormData(formPopupElement)

    for (const [] of searchParams.entries()) {
      searchParams.delete('price')
    }

    const arrayKeysForm = currentForm.getAll('price-num')

    if (arrayKeysForm[0] <= 0) {
      arrayKeysForm[0] = 0
    } else if (arrayKeysForm[0] >= 9000) {
      arrayKeysForm[0] = 9000
    }

    if (arrayKeysForm[1] <= 1000) {
      arrayKeysForm[1] = 1000
    } else if (arrayKeysForm[1] >= 10000) {
      arrayKeysForm[1] = 10000
    }

    let minPrice = parseInt(priceAllInputFilterPopupElements[0].value)
    let maxPrice = parseInt(priceAllInputFilterPopupElements[1].value)

    if (minPrice >= 9000) {
      priceAllInputFilterPopupElements[0].value = 9000
      priceAllInputFilterPopupElements[1].value = 10000

      rangeAllInputFilterPopupElements[0].value = 9000
      rangeAllInputFilterPopupElements[1].value = 10000

      rangeFilterSliderProgressPopupElement.style.left =
        (9000 / rangeAllInputFilterPopupElements[0].max) * 100 + '%'
      rangeFilterSliderProgressPopupElement.style.right =
        100 - (10000 / rangeAllInputFilterPopupElements[1].max) * 100 + '%'
    }

    if (maxPrice >= 10000) {
      priceAllInputFilterPopupElements[1].value = 10000
    } else if (maxPrice <= 0 || (maxPrice >= 0 && maxPrice <= 1000)) {
      priceAllInputFilterPopupElements[1].value = 1000
    }

    if (maxPrice - minPrice >= rangeSliderGap) {
      rangeAllInputFilterPopupElements[0].value = minPrice
      rangeFilterSliderProgressPopupElement.style.left =
        (minPrice / rangeAllInputFilterPopupElements[0].max) * 100 + '%'

      rangeAllInputFilterPopupElements[1].value = maxPrice
      rangeFilterSliderProgressPopupElement.style.right =
        100 - (maxPrice / rangeAllInputFilterPopupElements[1].max) * 100 + '%'
    } else if (minPrice <= 9000) {
      priceAllInputFilterPopupElements[1].value = minPrice + rangeSliderGap
      rangeAllInputFilterPopupElements[1].value = minPrice + rangeSliderGap
      arrayKeysForm[1] = priceAllInputFilterPopupElements[1].value

      rangeFilterSliderProgressPopupElement.style.right =
        100 -
        (rangeAllInputFilterPopupElements[1].value / rangeAllInputFilterPopupElements[1].max) *
          100 +
        '%'
    }

    if (minPrice <= 0) {
      priceAllInputFilterPopupElements[0].value = 0
      rangeAllInputFilterPopupElements[0].value = 0

      rangeFilterSliderProgressPopupElement.style.left = '0%'
    }

    if (maxPrice > 10000) {
      priceAllInputFilterPopupElements[1].value = 10000
      rangeAllInputFilterPopupElements[1].value = 10000

      rangeFilterSliderProgressPopupElement.style.right = '0%'
    }

    if (
      priceAllInputFilterPopupElements[0].value >= 0 &&
      priceAllInputFilterPopupElements[0].value <= 9000 &&
      priceAllInputFilterPopupElements[1].value >= 1000 &&
      priceAllInputFilterPopupElements[1].value <= 10000
    ) {
      filterItemButton4Element.classList.add('form-slider__button--active')
      filterItemButtonIcon4Element.style.color = 'white'
      filterItemButtonReset4Element.classList.add('form-slider__button-reset--active')
    } else {
      filterItemButton4Element.classList.remove('form-slider__button--active')
      filterItemButtonIcon4Element.style.color = ''
      filterItemButtonReset4Element.classList.remove('form-slider__button-reset--active')
    }

    arrayKeysForm.forEach((keyFormItem) => {
      searchParams.append('price', keyFormItem)
    })

    filterButtonInfoPopup4Element.innerText = `Диапазон цены (${priceAllInputFilterPopupElements[0].value} - ${priceAllInputFilterPopupElements[1].value})`
  })
})

rangeAllInputFilterPopupElements.forEach((rangeInputItemPopup) => {
  rangeInputItemPopup.addEventListener('input', () => {
    const currentForm = new FormData(formPopupElement)

    for (const [] of searchParams.entries()) {
      searchParams.delete('price')
    }

    const arrayKeysForm = currentForm.getAll('price')

    if (arrayKeysForm[0] >= 9000) {
      arrayKeysForm[0] = 9000
    }
    if (arrayKeysForm[1] <= 1000) {
      arrayKeysForm[1] = 1000
    }

    arrayKeysForm.forEach((keyFormItem) => {
      searchParams.append('price', keyFormItem)
    })

    let minVal = parseInt(rangeAllInputFilterPopupElements[0].value)
    let maxVal = parseInt(rangeAllInputFilterPopupElements[1].value)

    priceAllInputFilterPopupElements[0].value = minVal
    priceAllInputFilterPopupElements[1].value = maxVal

    if (maxVal - minVal <= rangeSliderGap) {
      rangeAllInputFilterPopupElements[0].value = maxVal - rangeSliderGap
      rangeAllInputFilterPopupElements[1].value = minVal + rangeSliderGap
    } else {
      rangeFilterSliderProgressPopupElement.style.left =
        (minVal / rangeAllInputFilterPopupElements[0].max) * 100 + '%'
      rangeFilterSliderProgressPopupElement.style.right =
        100 - (maxVal / rangeAllInputFilterPopupElements[1].max) * 100 + '%'
    }

    if (minVal === 0 && maxVal <= 1000) {
      priceAllInputFilterPopupElements[0].value = 0
      priceAllInputFilterPopupElements[1].value = 1000

      rangeFilterSliderProgressPopupElement.style.left = '0%'
      rangeFilterSliderProgressPopupElement.style.right = '90%'
    } else if (minVal >= 9000 && maxVal === 10000) {
      priceAllInputFilterPopupElements[0].value = 9000
      priceAllInputFilterPopupElements[1].value = 10000
      rangeFilterSliderProgressPopupElement.style.left = '90%'
      rangeFilterSliderProgressPopupElement.style.right = '0%'
    } else {
      rangeFilterSliderProgressPopupElement.style.left =
        (minVal / rangeAllInputFilterPopupElements[0].max) * 100 + '%'
      rangeFilterSliderProgressPopupElement.style.right =
        100 - (maxVal / rangeAllInputFilterPopupElements[1].max) * 100 + '%'
    }

    if (
      rangeAllInputFilterPopupElements[0].value >= 0 &&
      rangeAllInputFilterPopupElements[0].value <= 9000 &&
      rangeAllInputFilterPopupElements[1].value >= 1000 &&
      rangeAllInputFilterPopupElements[1].value <= 10000
    ) {
      filterItemButton4Element.classList.add('form-slider__button--active')
      filterItemButtonIcon4Element.style.color = 'white'
      filterItemButtonReset4Element.classList.add('form-slider__button-reset--active')
    } else {
      filterItemButton4Element.classList.remove('form-slider__button--active')
      filterItemButtonIcon4Element.style.color = ''
      filterItemButtonReset4Element.classList.remove('form-slider__button-reset--active')
    }

    filterButtonInfoPopup4Element.innerText = `Диапазон цены (${rangeAllInputFilterPopupElements[0].value} - ${rangeAllInputFilterPopupElements[1].value})`
  })
})

rangeFilterSliderPopupElement.addEventListener('click', (e) => {
  const rangeFilterSliderWidthPopup = rangeFilterSliderPopupElement.scrollWidth

  if (e.target === e.currentTarget) {
    const rangeFilterSliderOffsetPopup = Math.ceil((e.layerX / rangeFilterSliderWidthPopup) * 100)

    if (rangeFilterSliderOffsetPopup > priceAllInputFilterPopupElements[1].value / 100) {
      const maxValue = rangeFilterSliderOffsetPopup * 100

      priceAllInputFilterPopupElements[1].value = maxValue
      rangeAllInputFilterPopupElements[1].value = maxValue
      rangeFilterSliderProgressPopupElement.style.right = 100 - rangeFilterSliderOffsetPopup + '%'
    } else {
      const minValue = rangeFilterSliderOffsetPopup * 100

      priceAllInputFilterPopupElements[0].value = minValue
      rangeAllInputFilterPopupElements[0].value = minValue
      rangeFilterSliderProgressPopupElement.style.left = rangeFilterSliderOffsetPopup + '%'
    }
  } else {
    const rangeFilterSliderProgressOffsetPopup = parseInt(e.target.style.left)
    const rangeFilterSliderOffsetPopup = (e.layerX / rangeFilterSliderWidthPopup) * 100
    const finalSliderOffsetPopup = Math.ceil(
      rangeFilterSliderProgressOffsetPopup + rangeFilterSliderOffsetPopup
    )

    if (finalSliderOffsetPopup <= 50) {
      const minValue = finalSliderOffsetPopup * 100

      priceAllInputFilterPopupElements[0].value = minValue
      rangeAllInputFilterPopupElements[0].value = minValue
      rangeFilterSliderProgressPopupElement.style.left = finalSliderOffsetPopup + '%'
    } else {
      const rangeSliderRightOffsetPopup = finalSliderOffsetPopup
      const maxValue = rangeSliderRightOffsetPopup * 100

      priceAllInputFilterPopupElements[1].value = maxValue
      rangeAllInputFilterPopupElements[1].value = maxValue
      rangeFilterSliderProgressPopupElement.style.right = 100 - rangeSliderRightOffsetPopup + '%'
    }
  }

  const currentForm = new FormData(formPopupElement)

  for (const [] of searchParams.entries()) {
    searchParams.delete('price')
  }

  const arrayKeysForm = currentForm.getAll('price-num')

  arrayKeysForm.forEach((keyFormItem) => {
    searchParams.append('price', keyFormItem)
  })

  if (
    rangeAllInputFilterPopupElements[0].value >= 0 &&
    rangeAllInputFilterPopupElements[0].value <= 9000 &&
    rangeAllInputFilterPopupElements[1].value >= 1000 &&
    rangeAllInputFilterPopupElements[1].value <= 10000
  ) {
    filterItemButton4Element.classList.add('form-slider__button--active')
    filterItemButtonIcon4Element.style.color = 'white'
    filterItemButtonReset4Element.classList.add('form-slider__button-reset--active')
  } else {
    filterItemButton4Element.classList.remove('form-slider__button--active')
    filterItemButtonIcon4Element.style.color = ''
    filterItemButtonReset4Element.classList.remove('form-slider__button-reset--active')
  }

  filterButtonInfoPopup4Element.innerText = `Диапазон цены (${priceAllInputFilterPopupElements[0].value} - ${priceAllInputFilterPopupElements[1].value})`

  formSubmitPopup.click()
})

/* ------------------------------------------------------------------------ */
// События range slider
/* ------------------------------------------------------------------------ */

// <<<<<------------------------------------------------------------------>>>>>

/* ------------------------------------------------------------------------ */
// События движений popup-окна
/* ------------------------------------------------------------------------ */

const filterButtonTouchPopupElement = document.querySelector('.filter-popup__button-touch')
const filterPopupButtonTouchWrapElement = document.querySelector('.filter-popup__button-wrap')

let isDraggingPopup = false
let startY
let translateOffsetY
let opacity = 1

filterPopupWrapperElement.style.transition = 'all .3s'

const dragStartPopup = (e) => {
  isDraggingPopup = true
  startY = e.touches[0].pageY

  filterPopupWrapperElement.style.transition = ''
  filterButtonTouchPopupElement.style.backgroundColor = '#df403b'
}

const draggingPopup = (e) => {
  if (e.touches[0].pageY < startY || !isDraggingPopup) return

  const distance = e.touches[0].pageY - startY

  translateOffsetY = `translateY(${distance}px)`
  opacity = distance !== 0 ? (100 - Math.round(distance / 3.5)) / 100 : '1'

  filterPopupWrapperElement.style.transform = translateOffsetY

  filterPopupWrapperElement.style.opacity = opacity

  const hidenHeightOffset = (filterPopupInnerElement.scrollHeight * 50) / 100

  if (distance > hidenHeightOffset) {
    isDraggingPopup = false

    bodyElement.style.position = 'static'
    filterPopupWrapperElement.style.maxHeight = '0'

    filterPopupAbsoluteContainerElement.classList.remove('visible-block')
    filterPopupAbsoluteContainerElement.classList.remove('overscroll-browser-reset')

    filterPopupAllItemElements.forEach((filterPopupItem) => {
      filterPopupItem.style.display = 'none'
    })

    changeButtonIconRotate()
  }
}

const dragStopPopup = () => {
  isDraggingPopup = false

  filterButtonTouchPopupElement.style.backgroundColor = 'white'
  filterPopupWrapperElement.style.transform = 'translateY(0px)'
  filterPopupWrapperElement.style.opacity = '1'
  filterPopupWrapperElement.style.transition = 'all 0.3s'
}

filterPopupButtonTouchWrapElement.addEventListener('touchstart', dragStartPopup)
filterPopupWrapperElement.addEventListener('touchmove', draggingPopup)
filterPopupAbsoluteContainerElement.addEventListener('touchend', dragStopPopup)

/* ------------------------------------------------------------------------ */
// События движений popup-окна
/* ------------------------------------------------------------------------ */

// <<<<<------------------------------------------------------------------>>>>>

/* ------------------------------------------------------------------------ */
// События движений слайдера
/* ------------------------------------------------------------------------ */

const filterDropdownWrapElements = document.querySelectorAll('.form-slider__dropdown-wrap')
const filterAllButtonItemWrapElements = document.querySelectorAll('.form-slider__item')
const sliderElement = document.querySelector('.filter__slider')

const filterGapSliderWIdth = (filterAllButtonItemWrapElements.length - 1) * 15

let totalButtonSliderWidth = 0
let distanseScrollOffset = 0
let isDraggingSlider = false
let startX
let distanceScroll

sliderElement.style.transform = 'translateX(0px)'

filterDropdownWrapElements.forEach((dropdownItem) => {
  dropdownItem.addEventListener('mousedown', (e) => {
    e.stopImmediatePropagation()

    isDraggingSlider = false
  })
})

const dragStartSlider = (e) => {
  sliderElement.style.transition = 'all .0s'

  filterAllButtonItemWrapElements.forEach((filerButtonItem) => {
    totalButtonSliderWidth += filerButtonItem.offsetWidth
  })

  const visibleWidthSlider = document.querySelector('.filter__slider').getBoundingClientRect().width
  const fullWidthSlider = filterGapSliderWIdth + totalButtonSliderWidth
  const differenceWidth = fullWidthSlider - visibleWidthSlider

  if (differenceWidth < 0) return

  isDraggingSlider = true
  startX = e.pageX
}

const draggingSlider = (e) => {
  if (!isDraggingSlider) return

  filterSliderOffset = true
  distanceScroll = e.pageX - startX

  const thisTranslateXSlider = +sliderElement.style.transform
    .match(/(-\d+|\d+)(,\d+)*(\.\d+)*/g)
    .join()

  if (thisTranslateXSlider === 0 && distanceScroll > 0) return

  sliderElement.style.transform = `translateX(${distanceScroll + distanseScrollOffset}` + 'px)'

  if (thisTranslateXSlider >= 0 && distanceScroll >= 0) {
    sliderElement.style.transform = 'translateX(0px)'
  }
}

const dragStopSlider = () => {
  const visibleWidthSlider = document.querySelector('.filter__slider').getBoundingClientRect().width
  const fullWidthSlider = filterGapSliderWIdth + totalButtonSliderWidth
  const differenceWidth = fullWidthSlider - visibleWidthSlider

  isDraggingSlider = false

  const thisTranslateXSlider = +sliderElement.style.transform
    .match(/(-\d+|\d+)(,\d+)*(\.\d+)*/g)
    .join()

  distanseScrollOffset = thisTranslateXSlider

  if (distanceScroll < 0 && distanceScroll < -10) {
    sliderElement.style.transition = 'all .3s'

    if (distanseScrollOffset >= -(differenceWidth - 200) && differenceWidth > 0) {
      distanseScrollOffset = distanseScrollOffset - 200
      sliderElement.style.transform = `translateX(${distanseScrollOffset}` + 'px)'
    } else {
      distanseScrollOffset = -differenceWidth
      sliderElement.style.transform = `translateX(${distanseScrollOffset}` + 'px)'
    }
  } else if (distanceScroll > 0 && distanceScroll > 10) {
    sliderElement.style.transition = 'all .3s'
    distanseScrollOffset = distanseScrollOffset + 200

    if (distanseScrollOffset < 0) {
      sliderElement.style.transform = `translateX(${distanseScrollOffset}` + 'px)'
    } else {
      distanseScrollOffset = 0
      sliderElement.style.transform = `translateX(${distanseScrollOffset}` + 'px)'
    }
  }

  distanceScroll = 0
  totalButtonSliderWidth = 0
  filterSliderOffset = false
}

const dragTouchStartSlider = (e) => {
  bodyElement.style.touchAction = 'none'
  sliderElement.style.transition = 'all .0s'

  filterAllButtonItemWrapElements.forEach((btnFilerItem) => {
    totalButtonSliderWidth += btnFilerItem.offsetWidth
  })

  const visibleWidthSlider = document.querySelector('.filter__slider').getBoundingClientRect().width
  const fullWidthSlider = filterGapSliderWIdth + totalButtonSliderWidth
  const differenceWidth = fullWidthSlider - visibleWidthSlider

  if (differenceWidth < 0) return

  isDraggingSlider = true
  startX = e.touches[0].pageX
}

const draggingTouchSlider = (e) => {
  if (!isDraggingSlider) return

  filterSliderOffset = true
  distanceScroll = e.touches[0].pageX - startX

  const thisTranslateXSlider = +sliderElement.style.transform
    .match(/(-\d+|\d+)(,\d+)*(\.\d+)*/g)
    .join()

  if (thisTranslateXSlider === 0 && distanceScroll > 0) return

  sliderElement.style.transform = `translateX(${distanceScroll + distanseScrollOffset}` + 'px)'

  if (thisTranslateXSlider >= 0 && distanceScroll >= 0) {
    sliderElement.style.transform = `translateX(${0}` + 'px)'
  }
}

const dragTouchStopSlider = () => {
  bodyElement.style.touchAction = 'pan-y'

  const visibleWidthSlider = document.querySelector('.filter__slider').getBoundingClientRect().width
  const fullWidthSlider = filterGapSliderWIdth + totalButtonSliderWidth
  const differenceWidth = fullWidthSlider - visibleWidthSlider

  isDraggingSlider = false

  const thisTranslateXSlider = +sliderElement.style.transform
    .match(/(-\d+|\d+)(,\d+)*(\.\d+)*/g)
    .join()

  distanseScrollOffset = thisTranslateXSlider

  if (distanceScroll < 0 && distanceScroll < -10) {
    sliderElement.style.transition = 'all .3s'

    if (distanseScrollOffset >= -(differenceWidth - 200) && differenceWidth > 0) {
      distanseScrollOffset = distanseScrollOffset - 200
      sliderElement.style.transform = `translateX(${distanseScrollOffset}` + 'px)'
    } else {
      distanseScrollOffset = -differenceWidth
      sliderElement.style.transform = `translateX(${distanseScrollOffset}` + 'px)'
    }
  } else if (distanceScroll > 0 && distanceScroll > 10) {
    sliderElement.style.transition = 'all .3s'
    distanseScrollOffset = distanseScrollOffset + 200

    if (distanseScrollOffset < 0) {
      sliderElement.style.transform = `translateX(${distanseScrollOffset}` + 'px)'
    } else {
      distanseScrollOffset = 0
      sliderElement.style.transform = `translateX(${distanseScrollOffset}` + 'px)'
    }
  }

  distanceScroll = 0
  totalButtonSliderWidth = 0
  filterSliderOffset = false
}

sliderElement.addEventListener('mousedown', dragStartSlider)
sliderElement.addEventListener('mousemove', draggingSlider)
window.addEventListener('mouseup', dragStopSlider)

sliderElement.addEventListener('touchstart', dragTouchStartSlider)
sliderElement.addEventListener('touchmove', draggingTouchSlider)
window.addEventListener('touchend', dragTouchStopSlider)

/* ------------------------------------------------------------------------ */
// События движений слайдера
/* ------------------------------------------------------------------------ */

// <<<<<------------------------------------------------------------------>>>>>

/* ------------------------------------------------------------------------ */
// События отправки form
/* ------------------------------------------------------------------------ */

const formElement = document.querySelector('.form-slider')
const filterButtonSubmitElement = document.querySelector('.form-slider__btn-submit')
const filterAllInputElements = document.querySelectorAll('.form-slider input')

const searchParams = new URLSearchParams()

const filterItemButtonSpan1Element = document.querySelector('.form-slider__button span')
const filterAllInputRadio1Elements = document.querySelectorAll('.form-slider__dropdown-1 input')
const filterItemButtonReset1Element = document.querySelector('.form-slider__button-reset-1')
const filterItemButton1Element = document.querySelector('.form-slider__button-1')
const filterItemButtonIcon1Element = filterItemButton1Element.querySelector('svg')
let totalInputCount1 = 0

const filterAllInputCheckbox2Elements = document.querySelectorAll('.form-slider__dropdown-2 input')
const filterItemButtonReset2Element = document.querySelector('.form-slider__button-reset-2')
const filterItemButton2Element = document.querySelector('.form-slider__button-2')
const filterItemButtonIcon2Element = filterItemButton2Element.querySelector('svg')
const filterItemButtonSpan2Element = filterItemButton2Element.querySelector('span')
let totalInputCount2 = 0

const filterAllInputCheckbox3Elements = document.querySelectorAll('.form-slider__dropdown-3 input')
const filterItemButtonReset3Element = document.querySelector('.form-slider__button-reset-3')
const filterItemButton3Element = document.querySelector('.form-slider__button-3')
const filterItemButtonIcon3Element = filterItemButton3Element.querySelector('svg')
const filterItemButtonSpan3Element = filterItemButton3Element.querySelector('span')
let totalInputCount3 = 0

const filterItemButtonReset4Element = document.querySelector('.form-slider__button-reset-4')
const filterItemButton4Element = document.querySelector('.form-slider__button-4')
const filterItemButtonIcon4Element = filterItemButton4Element.querySelector('svg')

// <<<----------------------->>>
// Функции

const resetInputs = (inputArray) => {
  inputArray.forEach((inputItem) => {
    inputItem.checked = false
    searchParams.delete(inputItem.name, inputItem.value)
  })
}

const sendingUrlParams = (newUrl = '') => {
  const arrayKeyParams = []
  const arrayValueParams = []
  const arrayFinalStrParams = []
  let finalStr = ''

  for (let value of searchParams.keys()) {
    arrayKeyParams.push(value)
  }

  const newSetKeyParams = new Set(arrayKeyParams)
  const arrayConvertedKeyParams = Array.from(newSetKeyParams)

  arrayConvertedKeyParams.forEach((keyParam, indexKeyParam) => {
    arrayValueParams[indexKeyParam] = searchParams.getAll(keyParam)
  })

  arrayValueParams.filter((valueItem) => {
    if (Array.isArray(valueItem)) return valueItem
  })

  arrayValueParams.map((valueItem) => {
    return valueItem.sort((a, b) => a - b)
  })

  for (let i = 0; i < arrayConvertedKeyParams.length; i++) {
    arrayFinalStrParams[i] = arrayConvertedKeyParams[i] + '=' + arrayValueParams[i].join('--')
  }

  finalStr = arrayFinalStrParams.join('&')

  if (searchParams.size <= 0) {
    newUrl =
      window.location.protocol +
      '//' +
      window.location.host +
      window.location.pathname +
      searchParams.toString()
  } else {
    newUrl =
      window.location.protocol +
      '//' +
      window.location.host +
      window.location.pathname +
      '?' +
      finalStr
  }

  history.pushState({}, '', newUrl)
}

const submitForm = (itemInput, btnSubmit) => {
  itemInput.addEventListener('input', () => {
    btnSubmit.click()
  })
}

const paramHandler = () => {
  for (const [key, value] of searchParams.entries()) {
    if (searchParams.has(key, value)) {
      searchParams.delete(key, value)
    }

    searchParams.append(key, value)
  }

  sendingUrlParams()
}

const implementingFormReset = (event, inputArray, btnItem, btnItemIcon, btnItemReset) => {
  resetInputs(inputArray)
  btnItem.classList.remove('form-slider__button--active')
  btnItemReset.classList.remove('form-slider__button-reset--active')
  btnItemIcon.style.color = ''

  const dropdownBlock = event.currentTarget.parentNode.nextElementSibling

  dropdownBlock.classList.remove('visible-block')

  const isDropdownVisible = dropdownBlock.classList.contains('visible-block')
  
  if (isDropdownVisible) {
    dropdownBlock.style.maxHeight = dropdownBlock.scrollHeight + 'px'
  } else {
    dropdownBlock.style.maxHeight = '0'
  }

  changeButtonIconRotate()
}

const btnResetVisible = (totalInputCount, btnItem, btnItemIcon, btnItemReset) => {
  if (totalInputCount > 0) {
    btnItem.classList.add('form-slider__button--active')
    btnItemIcon.style.color = 'white'
    btnItemReset.classList.add('form-slider__button-reset--active')
  } else {
    btnItem.classList.remove('form-slider__button--active')
    btnItemIcon.style.color = ''
    btnItemReset.classList.remove('form-slider__button-reset--active')
  }
}

// Функции
// <<<----------------------->>>

// <<<----------------------->>>
// Form Input Group

filterAllInputRadio1Elements.forEach((inputRadioItem) => {
  inputRadioItem.addEventListener('input', () => {
    if (inputRadioItem.checked === true) totalInputCount1++
    else totalInputCount1--

    btnResetVisible(
      totalInputCount1,
      filterItemButton1Element,
      filterItemButtonIcon1Element,
      filterItemButtonReset1Element
    )

    filterAllInputRadio1Elements.forEach((inputRadioFilter) => {
      inputRadioFilter.nextElementSibling.classList.remove('form-slider__input-radio--box-shadow')
    })

    const formData = new FormData(formElement)

    for (const [key, value] of formData.entries()) {
      if (key === 'sort-price') searchParams.set(key, value)
    }

    filterItemButtonSpan1Element.innerText = inputRadioItem.nextElementSibling.innerText
  })
})

filterAllInputCheckbox2Elements.forEach((inputCheckboxItem) => {
  inputCheckboxItem.addEventListener('input', () => {
    if (inputCheckboxItem.checked === true) {
      totalInputCount2++
    } else {
      totalInputCount2--
    }

    btnResetVisible(
      totalInputCount2,
      filterItemButton2Element,
      filterItemButtonIcon2Element,
      filterItemButtonReset2Element
    )

    if (totalInputCount2 > 0) {
      filterItemButtonSpan2Element.innerHTML = 'Для кого:&nbsp&nbsp' + totalInputCount2
    } else {
      filterItemButtonSpan2Element.innerText = 'Для кого'
    }

    if (inputCheckboxItem.checked) {
      searchParams.append(inputCheckboxItem.name, inputCheckboxItem.value)
    } else {
      searchParams.delete(inputCheckboxItem.name, inputCheckboxItem.value)
    }
  })
})

filterAllInputCheckbox3Elements.forEach((inputCheckboxItem) => {
  inputCheckboxItem.addEventListener('input', () => {
    if (inputCheckboxItem.checked === true) {
      totalInputCount3++
    } else {
      totalInputCount3--
    }

    btnResetVisible(
      totalInputCount3,
      filterItemButton3Element,
      filterItemButtonIcon3Element,
      filterItemButtonReset3Element
    )

    if (totalInputCount3 > 0) {
      filterItemButtonSpan3Element.innerHTML = 'Материал:&nbsp&nbsp' + totalInputCount3
    } else {
      filterItemButtonSpan3Element.innerText = 'Материал'
    }

    if (inputCheckboxItem.checked) {
      searchParams.append(inputCheckboxItem.name, inputCheckboxItem.value)
    } else {
      searchParams.delete(inputCheckboxItem.name, inputCheckboxItem.value)
    }
  })
})

// Form Input Group
// <<<----------------------->>>

// <<<----------------------->>>
// Form Button Reset

filterItemButtonReset1Element.addEventListener('click', (e) => {
  implementingFormReset(
    e,
    filterAllInputRadio1Elements,
    filterItemButton1Element,
    filterItemButtonIcon1Element,
    filterItemButtonReset1Element
  )

  filterAllInputRadio1Elements.forEach((inputRadioFilter) => {
    inputRadioFilter.nextElementSibling.classList.remove('form-slider__input-radio--box-shadow')
  })

  filterAllInputRadio1PopupElements.forEach((inputRadioItemPopup) => {
    inputRadioItemPopup.checked = false
  })

  filterItemButtonSpan1Element.innerText = 'По популярности'

  totalInputCount1 = 0
})

filterItemButtonReset2Element.addEventListener('click', (e) => {
  implementingFormReset(
    e,
    filterAllInputCheckbox2Elements,
    filterItemButton2Element,
    filterItemButtonIcon2Element,
    filterItemButtonReset2Element
  )

  filterAllInputCheckbox2PopupElements.forEach((inputRadioItemPopup) => {
    inputRadioItemPopup.checked = false
  })

  filterItemButtonSpan2Element.innerText = 'Для кого'
  filterItemButtonInfo2PopupElement.innerText = 'Для кого: (0)'

  totalInputCount2 = 0
})

filterItemButtonReset3Element.addEventListener('click', (e) => {
  implementingFormReset(
    e,
    filterAllInputCheckbox3Elements,
    filterItemButton3Element,
    filterItemButtonIcon3Element,
    filterItemButtonReset3Element
  )

  filterAllInputCheckbox3PopupElements.forEach((item) => {
    item.checked = false
  })

  filterItemButtonSpan3Element.innerText = 'Материал'
  filterItemButtonInfo3PopupElement.innerText = 'Материал: (0)'

  totalInputCount3 = 0
})

filterItemButtonReset4Element.addEventListener('click', (e) => {
  implementingFormReset(
    e,
    rangeAllInputFilterPopupElements,
    filterItemButton4Element,
    filterItemButtonIcon4Element,
    filterItemButtonReset4Element
  )

  for (const [] of searchParams.entries()) {
    searchParams.delete('price')
  }

  priceAllInputFilterElements[0].value = 0
  rangeAllInputFilterElements[0].value = 0
  rangeFilterSliderProgressElement.style.left = '0%'

  priceAllInputFilterPopupElements[0].value = 0
  rangeAllInputFilterPopupElements[0].value = 0
  rangeFilterSliderProgressPopupElement.style.left = '0%'

  priceAllInputFilterElements[1].value = 10000
  rangeAllInputFilterElements[1].value = 10000
  rangeFilterSliderProgressElement.style.right = '0%'

  priceAllInputFilterPopupElements[1].value = 10000
  rangeAllInputFilterPopupElements[1].value = 10000
  rangeFilterSliderProgressPopupElement.style.right = '0%'

  filterButtonInfoPopup4Element.innerText = 'Диапазон цены (0 - 10000)'
})

// Form Button Reset
// <<<----------------------->>>

filterAllInputElements.forEach((inputFormItem) => {
  submitForm(inputFormItem, filterButtonSubmitElement)
})

formElement.addEventListener('reset', (e) => {
  e.preventDefault()

  sendingUrlParams()
})

formElement.addEventListener('submit', (e) => {
  e.preventDefault()

  paramHandler()
})

/* ------------------------------------------------------------------------ */
// События отправки form
/* ------------------------------------------------------------------------ */

// -------------------------------------------------------------------

// <------------------------------------------->
// События отправки formPopup
// <------------------------------------------->

const filterItemButtonInfo1PopupElement = document.querySelector('.form-popup__btn-info-1')
const filterAllInputRadio1PopupElements = document.querySelectorAll(
  '.form-popup__content-wrap-1 input'
)

const filterItemButtonInfo2PopupElement = document.querySelector('.form-popup__btn-info-2')
const filterAllInputCheckbox2PopupElements = document.querySelectorAll(
  '.form-popup__content-wrap-2 input'
)

const filterItemButtonInfo3PopupElement = document.querySelector('.form-popup__btn-info-3')
const filterAllInputCheckbox3PopupElements = document.querySelectorAll(
  '.form-popup__content-wrap-3 input'
)

const formPopupElement = document.querySelector('.form-popup')
const formSubmitPopup = document.querySelector('.form-popup__submit')
const filterAllInputPopup = document.querySelectorAll('.form-popup input')

filterAllInputRadio1PopupElements.forEach((inputRadioItem) => {
  inputRadioItem.addEventListener('input', () => {
    if (inputRadioItem.checked === true) {
      totalInputCount1++
    } else {
      totalInputCount1--
    }

    checkedFilterRadioInput(filterAllInputRadio1PopupElements, filterAllInputRadio1Elements)

    const formData = new FormData(formPopupElement)

    for (const [key, value] of formData.entries()) {
      if (key === 'sort-price') searchParams.set(key, value)
    }

    btnResetVisible(
      totalInputCount1,
      filterItemButton1Element,
      filterItemButtonIcon1Element,
      filterItemButtonReset1Element
    )

    if (totalInputCount1 > 0) {
      filterItemButtonInfo1PopupElement.innerText = `Выбрано: ${inputRadioItem.nextElementSibling.innerText}`
    } else {
      filterItemButtonInfo1PopupElement.innerText = 'Выберите фильтр'
    }

    filterItemButtonSpan1Element.innerText = inputRadioItem.nextElementSibling.innerText

    formSubmitPopup.click()
  })
})

filterAllInputCheckbox2PopupElements.forEach((inputCheckboxItem) => {
  inputCheckboxItem.addEventListener('input', () => {
    if (inputCheckboxItem.checked === true) {
      totalInputCount2++
    } else {
      totalInputCount2--
    }

    if (inputCheckboxItem.checked) {
      searchParams.append(inputCheckboxItem.name, inputCheckboxItem.value)
    } else {
      searchParams.delete(inputCheckboxItem.name, inputCheckboxItem.value)
    }

    btnResetVisible(
      totalInputCount2,
      filterItemButton2Element,
      filterItemButtonIcon2Element,
      filterItemButtonReset2Element
    )

    if (totalInputCount2 > 0) {
      filterItemButtonInfo2PopupElement.innerText = `Для кого: (${totalInputCount2})`
      filterItemButtonSpan2Element.innerText = `Для кого: ${totalInputCount2}`
    } else {
      filterItemButtonInfo2PopupElement.innerText = 'Для кого: (0)'
      filterItemButtonSpan2Element.innerText = 'Для кого'
    }

    formSubmitPopup.click()
  })
})

filterAllInputCheckbox3PopupElements.forEach((inputCheckboxItem) => {
  inputCheckboxItem.addEventListener('input', () => {
    if (inputCheckboxItem.checked === true) {
      totalInputCount3++
    } else {
      totalInputCount3--
    }

    if (inputCheckboxItem.checked) {
      searchParams.append(inputCheckboxItem.name, inputCheckboxItem.value)
    } else {
      searchParams.delete(inputCheckboxItem.name, inputCheckboxItem.value)
    }

    formSubmitPopup.click()

    btnResetVisible(
      totalInputCount3,
      filterItemButton3Element,
      filterItemButtonIcon3Element,
      filterItemButtonReset3Element
    )

    if (totalInputCount3 > 0) {
      filterItemButtonInfo3PopupElement.innerText = `Материал: (${totalInputCount3})`
      filterItemButtonSpan3Element.innerText = `Материал: ${totalInputCount3}`
    } else {
      filterItemButtonInfo3PopupElement.innerText = 'Материал: (0)'
      filterItemButtonSpan3Element.innerText = 'Материал'
    }
  })
})

filterAllInputPopup.forEach((inputItemPopup) => {
  submitForm(inputItemPopup, formSubmitPopup)
})

formPopupElement.addEventListener('submit', (e) => {
  e.preventDefault()

  paramHandler()
})

// <------------------------------------------->
// События отправки formPopup
// <------------------------------------------->
