let $=jQuery

	$.fn.stamp = (data) ->
		return if not @length
		# Stamp the children
		@children!stamp(data)
		# Replace data-stamp-*
		@each !->
			$A = $(@)
			mold = $A.data!
			for key, value of mold
				if /^stamp/.test key
					attribute = key.substring(5).toLowerCase!
					switch attribute
						when "text" then $A.text data[value]
						else $A.attr attribute, data[value]
					$A.removeAttr \data-stamp- + attribute
		@

	$.fn.merge = ($doms) ->
		$doms.filter("[id]").each !(i, dom) ~>
			$dom = $(dom)
			id = $dom.attr "id"
			$child = this.children(\# + id)
			if $child.length is 0
				@append($dom)
			else
				$child.merge($dom.children!)
		$rest = $doms.filter ":not([id])"
		#[id]s handled, replace kids
		if $rest.length
			@children(":not([id])").remove!
			@append $rest
		@

	$templates = $ '''
		<div>
			<div id="_object">
				<div />
			</div>
			<div id="_tuple">
				<span>
					<b data-stamp-text="_name" />
				</span>
			</div>
			<div id="_array">
				<ul />
			</div>
			<div id="_array-item">
				<li />
			</div>
			<div id="_simple">
				<span data-stamp-text="_value" />
			</div>
		</div>
	'''

	$templates <<<
		get: (piece) ->
			$templates.find \# + piece .children! .clone!

	load = (html) ->
		$html = $ html
		$templates .merge $html

	stamp = (obj) ->
		if _.isArray obj
			stamp.array obj
		else if _.isObject obj
			stamp.object obj
		else
			stamp.simple obj

	stamp <<<
		array: (obj) ->
			$dom = $templates.get \_array
			[$dom.append stamp.array-item ob for ob in obj]
			$dom

		array-item: (obj) ->
			$dom = $templates.get \_array-item
			$dom.append stamp obj
			$dom

		object: (obj) ->
			$dom = $templates.get \_object
			[$dom.append stamp.tuple k, v for k, v of obj]
			$dom

		tuple: (k, v) ->
			$dom = $templates.get \_tuple
			$dom .stamp {_name: k, _value: v}
			$dom .append stamp v
			$dom

		simple: (obj) ->
			$dom = $templates.get \_simple
			$dom.stamp {_value: obj.toString!}
			$dom

	@data =
		stamp: stamp
		load: load