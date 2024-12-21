import { useModalStore } from "../../store/useModalStore"


export default function LogoutForm() {
  const { isOpen, setIsOpen } = useModalStore();
	console.log(isOpen);

	return (
		<>
			{isOpen && (
				<div id="default-modal" tabIndex="-1" aria-hidden="true" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
						<div className="relative p-4 w-full max-w-2xl max-h-full">
						
								<div className="relative bg-white rounded-lg shadow">
									
								
										<div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
												<h3 className="text-xl font-semibold text-lightblack">
												Log Out of Your Account
												</h3>
												<button onClick={() => setIsOpen(false)} type="button" className="text-gray-600 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="default-modal">
														<svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
																<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
														</svg>
														<span className="sr-only">Close modal</span>
												</button>
										</div>
			
										
										<div className="p-4 md:p-5 space-y-4">
												<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
												You’ll be signed out, and your cart items will be saved for your next visit. Are you sure you want to log out?
												</p>
										</div>

										<div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
												<button data-modal-hide="default-modal" type="button" className="bg-red-500 text-white py-2.5 rounded-lg text-sm px-5 text-center">Logout</button>

												<button data-modal-hide="default-modal" type="button" className="py-2.5 px-5 ms-3 rounded-lg text-sm text-lightgray border-2 border-lighgray hover:border-black">Decline</button>
										</div>
								</div>
						</div>
				</div>
			)}
		</>
	)
}


