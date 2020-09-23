import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RatingService } from 'src/app/services/rating.service';
import { Rating } from 'src/app/models/rating';

@Component({
  selector: 'app-rating-modal',
  templateUrl: './rating-modal.component.html',
  styleUrls: ['./rating-modal.component.css'],
  providers: [RatingService]
})
export class RatingModalComponent implements OnInit {
	@Input('postId') postId;
	@Input('postTitle') postTitle;
	@Input() token;  
	
	public starsGeneral: any;
  	public starsRatingOne: any;
	public modalId: number;
	public rating: Rating;

  	constructor(
	  	private _ratingService: RatingService
  	) {
		this.modalId = 123;
		this.starsGeneral = {'title': '', 'value': 0, 'stars': [
			{'id': 0, 'status': false, 'image': 'start2.png'},
			{'id': 1, 'status': false, 'image': 'start2.png'},
			{'id': 2, 'status': false, 'image': 'start2.png'},
			{'id': 3, 'status': false, 'image': 'start2.png'},
			{'id': 4, 'status': false, 'image': 'start2.png'},
		]};
		this.starsRatingOne = {'title': '', 'value': 0, 'stars': [
			{'id': 0, 'status': false, 'image': 'start2.png'},
			{'id': 1, 'status': false, 'image': 'start2.png'},
			{'id': 2, 'status': false, 'image': 'start2.png'},
			{'id': 3, 'status': false, 'image': 'start2.png'},
			{'id': 4, 'status': false, 'image': 'start2.png'},
		]};
		
	}

	ngOnInit() {		
		this.rating = new Rating(1, this.postId, 0);
		this.getTotalRating();
	}

	changeStatus(starsRating, n) {
		starsRating.value = n + 1;
		
		for (let i = 0; i <= n; i++) {
			starsRating.stars[i].image = 'start1.png';
			starsRating.stars[i].status = true;
		}
	
		if ( ( n + 1 ) < 5 ) {
			for (let i = n + 1; i <= 4; i++) {
				starsRating.stars[i].image = 'start2.png';
				starsRating.stars[i].status = false;
			}
		}
	}

	createRating() {
		this.rating.value = this.starsRatingOne.value;
			
		this._ratingService.create(this.rating, this.token).subscribe(
			response => {
				if ( response.status == 'success' ) {
					this.getTotalRating();
				}
			},
			error => {
				console.log(error);
			}
		);
	}

	getTotalRating() {
		this._ratingService.getTotalRatingByPost(this.postId, this.token).subscribe(
			response => {
				console.log("total: ", response);
				
				if ( response.status == 'success' ) {
					this.changeStatus(this.starsGeneral, response.total - 1);
				}
			},
			error => {
				console.log(error);
			}
		);
	}
}
