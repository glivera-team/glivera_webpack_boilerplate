const accordion = (triggers, activeStateName) => {
	const classNames =	{
		defaultActiveState: 'accordion__item--active-mod',
	};

	const $allTriggers = triggers ? document.querySelectorAll(triggers) : null;
	const activeStateClass = activeStateName ? activeStateName : classNames.defaultActiveState;

	const closeAllAccordion = () => {
		$allTriggers.forEach(($item) => {
			closeAccordion($item.parentNode, $item.nextElementSibling);
		});
	}

	const openAccordion = ($parentEl, $nextElementSibling) => {
		setTimeout(() => {
			closeAllAccordion(); // comment this if you want to not close the accordion element when one of it is open

			$parentEl.classList.add(activeStateClass);
			$nextElementSibling.style.maxHeight = $nextElementSibling.scrollHeight + 'px'; // eslint-disable-line
			$nextElementSibling.removeAttribute('aria-hidden');
		}, 100);
	};

	const closeAccordion = ($parentEl, $nextElementSibling) => {
		$parentEl.classList.remove(activeStateClass);
		$nextElementSibling.style.maxHeight = null; // eslint-disable-line no-param-reassign
		$nextElementSibling.setAttribute('aria-hidden', 'true');
	};

	const toggleActiveState = ($trigger) => {
		if (!$trigger) return;

		const $parentEl = $trigger.parentNode;
		const $nextElementSibling = $trigger.nextElementSibling;

		if ($parentEl.classList.contains(activeStateClass)) {
			closeAccordion($parentEl, $nextElementSibling);
			$trigger.setAttribute('aria-expanded', 'false');
		} else {
			openAccordion($parentEl, $nextElementSibling);
			$trigger.setAttribute('aria-expanded', 'true');
		}
	}


	if ($allTriggers) {
		$allTriggers.forEach(($item) => {
			$item.addEventListener('click', (e) => {
				toggleActiveState($item);
			});
		});
	}
}

export default accordion;	

//	How to use

// 	Add this 
//	accordion('.accordion__item_head', 'accordion__item--active-mod');
//	where you add the accordion component
