import React from "react";
import { useLocation } from "react-router-dom";



	export const Footer = () => {

		
			const location = useLocation();
			const isHomePage = location.pathname === "/"; // Adjust the path accordingly
		
			if (!isHomePage) {
				return null; // Do not render the footer on pages other than the home page
			}
		return (
			<footer className="footer mt-auto py-3 text-center">
				<div className="container">
					<div className="row">
						<div className="col-md-4">
							<img src="https://cdn.pixabay.com/photo/2019/12/30/05/30/cockatiel-4728876_1280.jpg" className="d-block w-100" alt="" />
							<p >
								Kelly deserves a glowing 5-star review!
								Their exceptional care for my birds during my beach trip exceeded my expectations.
								Regular updates and a relaxing return home makes her the top choice for pet sitting.
								Highly recommend this reliable and caring service! ⭐️⭐️⭐️⭐️⭐️</p>
						</div>
						<div className="col-md-4">
							<img src="https://cdn.pixabay.com/photo/2018/04/23/14/38/dog-3344414_1280.jpg" className="d-block w-100" alt="..." />
							<p>

								Kelly, the dog walker, is a miracle worker!
								She did an incredible job with my usually shy dog,
								making every walk a joyful experience.
								Her patience and expertise deserve a solid 5 stars.
								⭐️⭐️⭐️⭐️⭐️</p>
						</div>
						<div className="col-md-4">
							<img src="https://cdn.pixabay.com/photo/2017/08/02/10/01/people-2570587_1280.jpg" className="d-block w-100" alt="..." />

							<p>

								Kelly is a lifesaver! While I was on a business trip,
								she took exceptional care of my cat, ensuring timely and nourishing meals.
								Her attention to detail and reliability earn her a well-deserved 5-star rating. ⭐️⭐️⭐️⭐️⭐️

							</p>
						</div>
					</div>
				</div>
				<p style={{ marginTop: 'auto' }}>
					Made with <i className="fa fa-heart text-danger" /> by{" "}
					<a>John Durtka, Whitney Heacock, and Anastasiia Ivanova</a>
				</p>
			</footer>
		)
	};




