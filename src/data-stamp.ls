let $=jQuery

	$templates = $ '''
		<div>
			<div id="object">
				<div />
			</div>
			<div id="tuple">
				<span><b /><span /></span>
			</div>
			<div id="array">
				<ul />
			</div>
			<div id="array-item">
				<li />
			</div>
			<div id="simple">
				<span />
			</div>
		</div>
	'''

	$templates <<<
		get: (piece) ->
			$templates.find \# + piece .children! .clone!

	stamp = (obj) ->
		if _.isArray obj
			stamp.array obj
		else if _.isObject obj
			stamp.object obj
		else
			stamp.simple obj

	stamp <<<
		array: (obj) ->
			$dom = $templates.get \array
			[$dom.append stamp ob for ob in obj]
			$dom

		object: (obj) ->
			$dom = $templates.get \object
			[$dom.append stamp.tuple k, v for k, v of obj]
			$dom

		tuple: (k, v) ->
			$dom = $templates.get \tuple
			$dom
				.find \span
					.find \b .text k .end!
					.find \span .text v .end!
				.end!

		simple: (obj) ->
			$dom = $templates.get \simple
			$dom.text obj.toString!

	@data =
		stamp: stamp