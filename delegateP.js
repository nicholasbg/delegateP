(function( $ ) {

	$.fn.delegateP = function( eventType, selector, options ){

		var this_data,
			this_data_delegateP,
			callback = arguments[arguments.length -1];

		if( typeof callback === 'function' ){

			this_data = this.data();
			if( !this_data['delegateP'] ) this_data['delegateP'] = {};
			this_data_delegateP = this_data['delegateP'];

			if( typeof options !== 'object' ) options = {};

			if( !this_data_delegateP[eventType] ){

				this_data_delegateP[eventType] = [

					[selector,options,callback]

				];

				this.on( eventType, function(event) {

					var target = event.target,
						$targetWithParents = $(target).parents().add( target ),
						currentTarget = event.currentTarget,
						functions = this_data_delegateP[eventType],
						functions_length = functions.length,
						functions_loop_index = 0,
						current_function,
						options,
						reverse,
						$filtered,
						node;

					while( functions_loop_index < functions_length ){

						current_function = functions[functions_loop_index];
						options = current_function[1];
						reverse = options.reverse;
						$filtered = $targetWithParents.filter(current_function[0]);
						node = $filtered[$filtered.length - 1];

						if( reverse ? !node : node ){

							current_function[2].call( (reverse ? currentTarget : node), event );
							if( !reverse && !options['continue'] ) break;

						}

						functions_loop_index++;

					}

				});

			}else{

				this_data_delegateP[eventType].push([selector,options,callback]);

			}

		}

		return this;

	}

}( jQuery ));