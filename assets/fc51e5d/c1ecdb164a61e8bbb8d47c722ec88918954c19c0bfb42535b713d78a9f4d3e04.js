
!function($){"use strict";$(function(){$.support.transition=(function(){var transitionEnd=(function(){var el=document.createElement('bootstrap'),transEndEventNames={'WebkitTransition':'webkitTransitionEnd','MozTransition':'transitionend','OTransition':'oTransitionEnd otransitionend','transition':'transitionend'},name
for(name in transEndEventNames){if(el.style[name]!==undefined){return transEndEventNames[name]}}}())
return transitionEnd&&{end:transitionEnd}})()})}(window.jQuery);!function($){"use strict";var dismiss='[data-dismiss="alert"]',Alert=function(el){$(el).on('click',dismiss,this.close)}
Alert.prototype.close=function(e){var $this=$(this),selector=$this.attr('data-target'),$parent
if(!selector){selector=$this.attr('href')
selector=selector&&selector.replace(/.*(?=#[^\s]*$)/,'')}
$parent=$(selector)
e&&e.preventDefault()
$parent.length||($parent=$this.hasClass('alert')?$this:$this.parent())
$parent.trigger(e=$.Event('close'))
if(e.isDefaultPrevented())return
$parent.removeClass('in')
function removeElement(){$parent.trigger('closed').remove()}
$.support.transition&&$parent.hasClass('fade')?$parent.on($.support.transition.end,removeElement):removeElement()}
$.fn.alert=function(option){return this.each(function(){var $this=$(this),data=$this.data('alert')
if(!data)$this.data('alert',(data=new Alert(this)))
if(typeof option=='string')data[option].call($this)})}
$.fn.alert.Constructor=Alert
$(document).on('click.alert.data-api',dismiss,Alert.prototype.close)}(window.jQuery);!function($){"use strict";var Button=function(element,options){this.$element=$(element)
this.options=$.extend({},$.fn.button.defaults,options)}
Button.prototype.setState=function(state){var d='disabled',$el=this.$element,data=$el.data(),val=$el.is('input')?'val':'html'
state=state+'Text'
data.resetText||$el.data('resetText',$el[val]())
$el[val](data[state]||this.options[state])
setTimeout(function(){state=='loadingText'?$el.addClass(d).attr(d,d):$el.removeClass(d).removeAttr(d)},0)}
Button.prototype.toggle=function(){var $parent=this.$element.closest('[data-toggle="buttons-radio"]')
$parent&&$parent.find('.active').removeClass('active')
this.$element.toggleClass('active')}
$.fn.button=function(option){return this.each(function(){var $this=$(this),data=$this.data('button'),options=typeof option=='object'&&option
if(!data)$this.data('button',(data=new Button(this,options)))
if(option=='toggle')data.toggle()
else if(option)data.setState(option)})}
$.fn.button.defaults={loadingText:'loading...'}
$.fn.button.Constructor=Button
$(document).on('click.button.data-api','[data-toggle^=button]',function(e){var $btn=$(e.target)
if(!$btn.hasClass('btn'))$btn=$btn.closest('.btn')
$btn.button('toggle')})}(window.jQuery);!function($){"use strict";var Carousel=function(element,options){this.$element=$(element)
this.options=options
this.options.slide&&this.slide(this.options.slide)
this.options.pause=='hover'&&this.$element.on('mouseenter',$.proxy(this.pause,this)).on('mouseleave',$.proxy(this.cycle,this))}
Carousel.prototype={cycle:function(e){if(!e)this.paused=false
this.options.interval&&!this.paused&&(this.interval=setInterval($.proxy(this.next,this),this.options.interval))
return this},to:function(pos){var $active=this.$element.find('.item.active'),children=$active.parent().children(),activePos=children.index($active),that=this
if(pos>(children.length-1)||pos<0)return
if(this.sliding){return this.$element.one('slid',function(){that.to(pos)})}
if(activePos==pos){return this.pause().cycle()}
return this.slide(pos>activePos?'next':'prev',$(children[pos]))},pause:function(e){if(!e)this.paused=true
if(this.$element.find('.next, .prev').length&&$.support.transition.end){this.$element.trigger($.support.transition.end)
this.cycle()}
clearInterval(this.interval)
this.interval=null
return this},next:function(){if(this.sliding)return
return this.slide('next')},prev:function(){if(this.sliding)return
return this.slide('prev')},slide:function(type,next){var $active=this.$element.find('.item.active'),$next=next||$active[type](),isCycling=this.interval,direction=type=='next'?'left':'right',fallback=type=='next'?'first':'last',that=this,e
this.sliding=true
isCycling&&this.pause()
$next=$next.length?$next:this.$element.find('.item')[fallback]()
e=$.Event('slide',{relatedTarget:$next[0]})
if($next.hasClass('active'))return
if($.support.transition&&this.$element.hasClass('slide')){this.$element.trigger(e)
if(e.isDefaultPrevented())return
$next.addClass(type)
$next[0].offsetWidth
$active.addClass(direction)
$next.addClass(direction)
this.$element.one($.support.transition.end,function(){$next.removeClass([type,direction].join(' ')).addClass('active')
$active.removeClass(['active',direction].join(' '))
that.sliding=false
setTimeout(function(){that.$element.trigger('slid')},0)})}else{this.$element.trigger(e)
if(e.isDefaultPrevented())return
$active.removeClass('active')
$next.addClass('active')
this.sliding=false
this.$element.trigger('slid')}
isCycling&&this.cycle()
return this}}
$.fn.carousel=function(option){return this.each(function(){var $this=$(this),data=$this.data('carousel'),options=$.extend({},$.fn.carousel.defaults,typeof option=='object'&&option),action=typeof option=='string'?option:options.slide
if(!data)$this.data('carousel',(data=new Carousel(this,options)))
if(typeof option=='number')data.to(option)
else if(action)data[action]()
else if(options.interval)data.cycle()})}
$.fn.carousel.defaults={interval:5000,pause:'hover'}
$.fn.carousel.Constructor=Carousel
$(document).on('click.carousel.data-api','[data-slide]',function(e){var $this=$(this),href,$target=$($this.attr('data-target')||(href=$this.attr('href'))&&href.replace(/.*(?=#[^\s]+$)/,'')),options=$.extend({},$target.data(),$this.data())
$target.carousel(options)
e.preventDefault()})}(window.jQuery);!function($){"use strict";var Collapse=function(element,options){this.$element=$(element)
this.options=$.extend({},$.fn.collapse.defaults,options)
if(this.options.parent){this.$parent=$(this.options.parent)}
this.options.toggle&&this.toggle()}
Collapse.prototype={constructor:Collapse,dimension:function(){var hasWidth=this.$element.hasClass('width')
return hasWidth?'width':'height'},show:function(){var dimension,scroll,actives,hasData
if(this.transitioning)return
dimension=this.dimension()
scroll=$.camelCase(['scroll',dimension].join('-'))
actives=this.$parent&&this.$parent.find('> .accordion-group > .in')
if(actives&&actives.length){hasData=actives.data('collapse')
if(hasData&&hasData.transitioning)return
actives.collapse('hide')
hasData||actives.data('collapse',null)}
this.$element[dimension](0)
this.transition('addClass',$.Event('show'),'shown')
$.support.transition&&this.$element[dimension](this.$element[0][scroll])},hide:function(){var dimension
if(this.transitioning)return
dimension=this.dimension()
this.reset(this.$element[dimension]())
this.transition('removeClass',$.Event('hide'),'hidden')
this.$element[dimension](0)},reset:function(size){var dimension=this.dimension()
this.$element.removeClass('collapse')
[dimension](size||'auto')
[0].offsetWidth
this.$element[size!==null?'addClass':'removeClass']('collapse')
return this},transition:function(method,startEvent,completeEvent){var that=this,complete=function(){if(startEvent.type=='show')that.reset()
that.transitioning=0
that.$element.trigger(completeEvent)}
this.$element.trigger(startEvent)
if(startEvent.isDefaultPrevented())return
this.transitioning=1
this.$element[method]('in')
$.support.transition&&this.$element.hasClass('collapse')?this.$element.one($.support.transition.end,complete):complete()},toggle:function(){this[this.$element.hasClass('in')?'hide':'show']()}}
$.fn.collapse=function(option){return this.each(function(){var $this=$(this),data=$this.data('collapse'),options=typeof option=='object'&&option
if(!data)$this.data('collapse',(data=new Collapse(this,options)))
if(typeof option=='string')data[option]()})}
$.fn.collapse.defaults={toggle:true}
$.fn.collapse.Constructor=Collapse
$(document).on('click.collapse.data-api','[data-toggle=collapse]',function(e){var $this=$(this),href,target=$this.attr('data-target')||e.preventDefault()||(href=$this.attr('href'))&&href.replace(/.*(?=#[^\s]+$)/,''),option=$(target).data('collapse')?'toggle':$this.data()
$this[$(target).hasClass('in')?'addClass':'removeClass']('collapsed')
$(target).collapse(option)})}(window.jQuery);!function($){"use strict";var toggle='[data-toggle=dropdown]',Dropdown=function(element){var $el=$(element).on('click.dropdown.data-api',this.toggle)
$('html').on('click.dropdown.data-api',function(){$el.parent().removeClass('open')})}
Dropdown.prototype={constructor:Dropdown,toggle:function(e){var $this=$(this),$parent,isActive
if($this.is('.disabled, :disabled'))return
$parent=getParent($this)
isActive=$parent.hasClass('open')
clearMenus()
if(!isActive){$parent.toggleClass('open')
$this.focus()}
return false},keydown:function(e){var $this,$items,$active,$parent,isActive,index
if(!/(38|40|27)/.test(e.keyCode))return
$this=$(this)
e.preventDefault()
e.stopPropagation()
if($this.is('.disabled, :disabled'))return
$parent=getParent($this)
isActive=$parent.hasClass('open')
if(!isActive||(isActive&&e.keyCode==27))return $this.click()
$items=$('[role=menu] li:not(.divider) a',$parent)
if(!$items.length)return
index=$items.index($items.filter(':focus'))
if(e.keyCode==38&&index>0)index--
if(e.keyCode==40&&index<$items.length-1)index++
if(!~index)index=0
$items.eq(index).focus()}}
function clearMenus(){$(toggle).each(function(){getParent($(this)).removeClass('open')})}
function getParent($this){var selector=$this.attr('data-target'),$parent
if(!selector){selector=$this.attr('href')
selector=selector&&/#/.test(selector)&&selector.replace(/.*(?=#[^\s]*$)/,'')}
$parent=$(selector)
$parent.length||($parent=$this.parent())
return $parent}
$.fn.dropdown=function(option){return this.each(function(){var $this=$(this),data=$this.data('dropdown')
if(!data)$this.data('dropdown',(data=new Dropdown(this)))
if(typeof option=='string')data[option].call($this)})}
$.fn.dropdown.Constructor=Dropdown
$(document).on('click.dropdown.data-api touchstart.dropdown.data-api',clearMenus).on('click.dropdown touchstart.dropdown.data-api','.dropdown form',function(e){e.stopPropagation()}).on('click.dropdown.data-api touchstart.dropdown.data-api',toggle,Dropdown.prototype.toggle).on('keydown.dropdown.data-api touchstart.dropdown.data-api',toggle+', [role=menu]',Dropdown.prototype.keydown)}(window.jQuery);!function($){"use strict";var Modal=function(element,options){this.options=options
this.$element=$(element).delegate('[data-dismiss="modal"]','click.dismiss.modal',$.proxy(this.hide,this))
this.options.remote&&this.$element.find('.modal-body').load(this.options.remote)}
Modal.prototype={constructor:Modal,toggle:function(){return this[!this.isShown?'show':'hide']()},show:function(){var that=this,e=$.Event('show')
this.$element.trigger(e)
if(this.isShown||e.isDefaultPrevented())return
this.isShown=true
this.escape()
this.backdrop(function(){var transition=$.support.transition&&that.$element.hasClass('fade')
if(!that.$element.parent().length){that.$element.appendTo(document.body)}
that.$element.show()
if(transition){that.$element[0].offsetWidth}
that.$element.addClass('in').attr('aria-hidden',false)
that.enforceFocus()
transition?that.$element.one($.support.transition.end,function(){that.$element.focus().trigger('shown')}):that.$element.focus().trigger('shown')})},hide:function(e){e&&e.preventDefault()
var that=this
e=$.Event('hide')
this.$element.trigger(e)
if(!this.isShown||e.isDefaultPrevented())return
this.isShown=false
this.escape()
$(document).off('focusin.modal')
this.$element.removeClass('in').attr('aria-hidden',true)
$.support.transition&&this.$element.hasClass('fade')?this.hideWithTransition():this.hideModal()},enforceFocus:function(){var that=this
$(document).on('focusin.modal',function(e){if(that.$element[0]!==e.target&&!that.$element.has(e.target).length){that.$element.focus()}})},escape:function(){var that=this
if(this.isShown&&this.options.keyboard){this.$element.on('keyup.dismiss.modal',function(e){e.which==27&&that.hide()})}else if(!this.isShown){this.$element.off('keyup.dismiss.modal')}},hideWithTransition:function(){var that=this,timeout=setTimeout(function(){that.$element.off($.support.transition.end)
that.hideModal()},500)
this.$element.one($.support.transition.end,function(){clearTimeout(timeout)
that.hideModal()})},hideModal:function(that){this.$element.hide().trigger('hidden')
this.backdrop()},removeBackdrop:function(){this.$backdrop.remove()
this.$backdrop=null},backdrop:function(callback){var that=this,animate=this.$element.hasClass('fade')?'fade':''
if(this.isShown&&this.options.backdrop){var doAnimate=$.support.transition&&animate
this.$backdrop=$('<div class="modal-backdrop '+animate+'" />').appendTo(document.body)
this.$backdrop.click(this.options.backdrop=='static'?$.proxy(this.$element[0].focus,this.$element[0]):$.proxy(this.hide,this))
if(doAnimate)this.$backdrop[0].offsetWidth
this.$backdrop.addClass('in')
doAnimate?this.$backdrop.one($.support.transition.end,callback):callback()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass('in')
$.support.transition&&this.$element.hasClass('fade')?this.$backdrop.one($.support.transition.end,$.proxy(this.removeBackdrop,this)):this.removeBackdrop()}else if(callback){callback()}}}
$.fn.modal=function(option){return this.each(function(){var $this=$(this),data=$this.data('modal'),options=$.extend({},$.fn.modal.defaults,$this.data(),typeof option=='object'&&option)
if(!data)$this.data('modal',(data=new Modal(this,options)))
if(typeof option=='string')data[option]()
else if(options.show)data.show()})}
$.fn.modal.defaults={backdrop:true,keyboard:true,show:true}
$.fn.modal.Constructor=Modal
$(document).on('click.modal.data-api','[data-toggle="modal"]',function(e){var $this=$(this),href=$this.attr('href'),$target=$($this.attr('data-target')||(href&&href.replace(/.*(?=#[^\s]+$)/,''))),option=$target.data('modal')?'toggle':$.extend({remote:!/#/.test(href)&&href},$target.data(),$this.data())
e.preventDefault()
$target.modal(option).one('hide',function(){$this.focus()})})}(window.jQuery);!function($){"use strict";var Tooltip=function(element,options){this.init('tooltip',element,options)}
Tooltip.prototype={constructor:Tooltip,init:function(type,element,options){var eventIn,eventOut
this.type=type
this.$element=$(element)
this.options=this.getOptions(options)
this.enabled=true
if(this.options.trigger=='click'){this.$element.on('click.'+this.type,this.options.selector,$.proxy(this.toggle,this))}else if(this.options.trigger!='manual'){eventIn=this.options.trigger=='hover'?'mouseenter':'focus'
eventOut=this.options.trigger=='hover'?'mouseleave':'blur'
this.$element.on(eventIn+'.'+this.type,this.options.selector,$.proxy(this.enter,this))
this.$element.on(eventOut+'.'+this.type,this.options.selector,$.proxy(this.leave,this))}
this.options.selector?(this._options=$.extend({},this.options,{trigger:'manual',selector:''})):this.fixTitle()},getOptions:function(options){options=$.extend({},$.fn[this.type].defaults,options,this.$element.data())
if(options.delay&&typeof options.delay=='number'){options.delay={show:options.delay,hide:options.delay}}
return options},enter:function(e){var self=$(e.currentTarget)[this.type](this._options).data(this.type)
if(!self.options.delay||!self.options.delay.show)return self.show()
clearTimeout(this.timeout)
self.hoverState='in'
this.timeout=setTimeout(function(){if(self.hoverState=='in')self.show()},self.options.delay.show)},leave:function(e){var self=$(e.currentTarget)[this.type](this._options).data(this.type)
if(this.timeout)clearTimeout(this.timeout)
if(!self.options.delay||!self.options.delay.hide)return self.hide()
self.hoverState='out'
this.timeout=setTimeout(function(){if(self.hoverState=='out')self.hide()},self.options.delay.hide)},show:function(){var $tip,inside,pos,actualWidth,actualHeight,placement,tp
if(this.hasContent()&&this.enabled){$tip=this.tip()
this.setContent()
if(this.options.animation){$tip.addClass('fade')}
placement=typeof this.options.placement=='function'?this.options.placement.call(this,$tip[0],this.$element[0]):this.options.placement
inside=/in/.test(placement)
$tip.detach().css({top:0,left:0,display:'block'}).insertAfter(this.$element)
pos=this.getPosition(inside)
actualWidth=$tip[0].offsetWidth
actualHeight=$tip[0].offsetHeight
switch(inside?placement.split(' ')[1]:placement){case'bottom':tp={top:pos.top+pos.height,left:pos.left+pos.width/2-actualWidth/2}
break
case'top':tp={top:pos.top-actualHeight,left:pos.left+pos.width/2-actualWidth/2}
break
case'left':tp={top:pos.top+pos.height/2-actualHeight/2,left:pos.left-actualWidth}
break
case'right':tp={top:pos.top+pos.height/2-actualHeight/2,left:pos.left+pos.width}
break}
$tip.offset(tp).addClass(placement).addClass('in')}},setContent:function(){var $tip=this.tip(),title=this.getTitle()
$tip.find('.tooltip-inner')[this.options.html?'html':'text'](title)
$tip.removeClass('fade in top bottom left right')},hide:function(){var that=this,$tip=this.tip()
$tip.removeClass('in')
function removeWithAnimation(){var timeout=setTimeout(function(){$tip.off($.support.transition.end).detach()},500)
$tip.one($.support.transition.end,function(){clearTimeout(timeout)
$tip.detach()})}
$.support.transition&&this.$tip.hasClass('fade')?removeWithAnimation():$tip.detach()
return this},fixTitle:function(){var $e=this.$element
if($e.attr('title')||typeof($e.attr('data-original-title'))!='string'){$e.attr('data-original-title',$e.attr('title')||'').removeAttr('title')}},hasContent:function(){return this.getTitle()},getPosition:function(inside){return $.extend({},(inside?{top:0,left:0}:this.$element.offset()),{width:this.$element[0].offsetWidth,height:this.$element[0].offsetHeight})},getTitle:function(){var title,$e=this.$element,o=this.options
title=$e.attr('data-original-title')||(typeof o.title=='function'?o.title.call($e[0]):o.title)
return title},tip:function(){return this.$tip=this.$tip||$(this.options.template)},validate:function(){if(!this.$element[0].parentNode){this.hide()
this.$element=null
this.options=null}},enable:function(){this.enabled=true},disable:function(){this.enabled=false},toggleEnabled:function(){this.enabled=!this.enabled},toggle:function(e){var self=$(e.currentTarget)[this.type](this._options).data(this.type)
self[self.tip().hasClass('in')?'hide':'show']()},destroy:function(){this.hide().$element.off('.'+this.type).removeData(this.type)}}
$.fn.tooltip=function(option){return this.each(function(){var $this=$(this),data=$this.data('tooltip'),options=typeof option=='object'&&option
if(!data)$this.data('tooltip',(data=new Tooltip(this,options)))
if(typeof option=='string')data[option]()})}
$.fn.tooltip.Constructor=Tooltip
$.fn.tooltip.defaults={animation:true,placement:'top',selector:false,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:'hover',title:'',delay:0,html:false}}(window.jQuery);!function($){"use strict";var Popover=function(element,options){this.init('popover',element,options)}
Popover.prototype=$.extend({},$.fn.tooltip.Constructor.prototype,{constructor:Popover,setContent:function(){var $tip=this.tip(),title=this.getTitle(),content=this.getContent()
$tip.find('.popover-title')[this.options.html?'html':'text'](title)
$tip.find('.popover-content > *')[this.options.html?'html':'text'](content)
$tip.removeClass('fade top bottom left right in')},hasContent:function(){return this.getTitle()||this.getContent()},getContent:function(){var content,$e=this.$element,o=this.options
content=$e.attr('data-content')||(typeof o.content=='function'?o.content.call($e[0]):o.content)
return content},tip:function(){if(!this.$tip){this.$tip=$(this.options.template)}
return this.$tip},destroy:function(){this.hide().$element.off('.'+this.type).removeData(this.type)}})
$.fn.popover=function(option){return this.each(function(){var $this=$(this),data=$this.data('popover'),options=typeof option=='object'&&option
if(!data)$this.data('popover',(data=new Popover(this,options)))
if(typeof option=='string')data[option]()})}
$.fn.popover.Constructor=Popover
$.fn.popover.defaults=$.extend({},$.fn.tooltip.defaults,{placement:'right',trigger:'click',content:'',template:'<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'})}(window.jQuery);!function($){"use strict";function ScrollSpy(element,options){var process=$.proxy(this.process,this),$element=$(element).is('body')?$(window):$(element),href
this.options=$.extend({},$.fn.scrollspy.defaults,options)
this.$scrollElement=$element.on('scroll.scroll-spy.data-api',process)
this.selector=(this.options.target||((href=$(element).attr('href'))&&href.replace(/.*(?=#[^\s]+$)/,''))||'')+' .nav li > a'
this.$body=$('body')
this.refresh()
this.process()}
ScrollSpy.prototype={constructor:ScrollSpy,refresh:function(){var self=this,$targets
this.offsets=$([])
this.targets=$([])
$targets=this.$body.find(this.selector).map(function(){var $el=$(this),href=$el.data('target')||$el.attr('href'),$href=/^#\w/.test(href)&&$(href)
return($href&&$href.length&&[[$href.position().top,href]])||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){self.offsets.push(this[0])
self.targets.push(this[1])})},process:function(){var scrollTop=this.$scrollElement.scrollTop()+this.options.offset,scrollHeight=this.$scrollElement[0].scrollHeight||this.$body[0].scrollHeight,maxScroll=scrollHeight-this.$scrollElement.height(),offsets=this.offsets,targets=this.targets,activeTarget=this.activeTarget,i
if(scrollTop>=maxScroll){return activeTarget!=(i=targets.last()[0])&&this.activate(i)}
for(i=offsets.length;i--;){activeTarget!=targets[i]&&scrollTop>=offsets[i]&&(!offsets[i+1]||scrollTop<=offsets[i+1])&&this.activate(targets[i])}},activate:function(target){var active,selector
this.activeTarget=target
$(this.selector).parent('.active').removeClass('active')
selector=this.selector
+'[data-target="'+target+'"],'
+this.selector+'[href="'+target+'"]'
active=$(selector).parent('li').addClass('active')
if(active.parent('.dropdown-menu').length){active=active.closest('li.dropdown').addClass('active')}
active.trigger('activate')}}
$.fn.scrollspy=function(option){return this.each(function(){var $this=$(this),data=$this.data('scrollspy'),options=typeof option=='object'&&option
if(!data)$this.data('scrollspy',(data=new ScrollSpy(this,options)))
if(typeof option=='string')data[option]()})}
$.fn.scrollspy.Constructor=ScrollSpy
$.fn.scrollspy.defaults={offset:10}
$(window).on('load',function(){$('[data-spy="scroll"]').each(function(){var $spy=$(this)
$spy.scrollspy($spy.data())})})}(window.jQuery);!function($){"use strict";var Tab=function(element){this.element=$(element)}
Tab.prototype={constructor:Tab,show:function(){var $this=this.element,$ul=$this.closest('ul:not(.dropdown-menu)'),selector=$this.attr('data-target'),previous,$target,e
if(!selector){selector=$this.attr('href')
selector=selector&&selector.replace(/.*(?=#[^\s]*$)/,'')}
if($this.parent('li').hasClass('active'))return
previous=$ul.find('.active:last a')[0]
e=$.Event('show',{relatedTarget:previous})
$this.trigger(e)
if(e.isDefaultPrevented())return
$target=$(selector)
this.activate($this.parent('li'),$ul)
this.activate($target,$target.parent(),function(){$this.trigger({type:'shown',relatedTarget:previous})})},activate:function(element,container,callback){var $active=container.find('> .active'),transition=callback&&$.support.transition&&$active.hasClass('fade')
function next(){$active.removeClass('active').find('> .dropdown-menu > .active').removeClass('active')
element.addClass('active')
if(transition){element[0].offsetWidth
element.addClass('in')}else{element.removeClass('fade')}
if(element.parent('.dropdown-menu')){element.closest('li.dropdown').addClass('active')}
callback&&callback()}
transition?$active.one($.support.transition.end,next):next()
$active.removeClass('in')}}
$.fn.tab=function(option){return this.each(function(){var $this=$(this),data=$this.data('tab')
if(!data)$this.data('tab',(data=new Tab(this)))
if(typeof option=='string')data[option]()})}
$.fn.tab.Constructor=Tab
$(document).on('click.tab.data-api','[data-toggle="tab"], [data-toggle="pill"]',function(e){e.preventDefault()
$(this).tab('show')})}(window.jQuery);!function($){"use strict";var Typeahead=function(element,options){this.$element=$(element)
this.options=$.extend({},$.fn.typeahead.defaults,options)
this.matcher=this.options.matcher||this.matcher
this.sorter=this.options.sorter||this.sorter
this.highlighter=this.options.highlighter||this.highlighter
this.updater=this.options.updater||this.updater
this.$menu=$(this.options.menu).appendTo('body')
this.source=this.options.source
this.shown=false
this.listen()}
Typeahead.prototype={constructor:Typeahead,select:function(){var val=this.$menu.find('.active').attr('data-value')
this.$element.val(this.updater(val)).change()
return this.hide()},updater:function(item){return item},show:function(){var pos=$.extend({},this.$element.offset(),{height:this.$element[0].offsetHeight})
this.$menu.css({top:pos.top+pos.height,left:pos.left})
this.$menu.show()
this.shown=true
return this},hide:function(){this.$menu.hide()
this.shown=false
return this},lookup:function(event){var items
this.query=this.$element.val()
if(!this.query||this.query.length<this.options.minLength){return this.shown?this.hide():this}
items=$.isFunction(this.source)?this.source(this.query,$.proxy(this.process,this)):this.source
return items?this.process(items):this},process:function(items){var that=this
items=$.grep(items,function(item){return that.matcher(item)})
items=this.sorter(items)
if(!items.length){return this.shown?this.hide():this}
return this.render(items.slice(0,this.options.items)).show()},matcher:function(item){return~item.toLowerCase().indexOf(this.query.toLowerCase())},sorter:function(items){var beginswith=[],caseSensitive=[],caseInsensitive=[],item
while(item=items.shift()){if(!item.toLowerCase().indexOf(this.query.toLowerCase()))beginswith.push(item)
else if(~item.indexOf(this.query))caseSensitive.push(item)
else caseInsensitive.push(item)}
return beginswith.concat(caseSensitive,caseInsensitive)},highlighter:function(item){var query=this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,'\\$&')
return item.replace(new RegExp('('+query+')','ig'),function($1,match){return'<strong>'+match+'</strong>'})},render:function(items){var that=this
items=$(items).map(function(i,item){i=$(that.options.item).attr('data-value',item)
i.find('a').html(that.highlighter(item))
return i[0]})
items.first().addClass('active')
this.$menu.html(items)
return this},next:function(event){var active=this.$menu.find('.active').removeClass('active'),next=active.next()
if(!next.length){next=$(this.$menu.find('li')[0])}
next.addClass('active')},prev:function(event){var active=this.$menu.find('.active').removeClass('active'),prev=active.prev()
if(!prev.length){prev=this.$menu.find('li').last()}
prev.addClass('active')},listen:function(){this.$element.on('blur',$.proxy(this.blur,this)).on('keypress',$.proxy(this.keypress,this)).on('keyup',$.proxy(this.keyup,this))
if(this.eventSupported('keydown')){this.$element.on('keydown',$.proxy(this.keydown,this))}
this.$menu.on('click',$.proxy(this.click,this)).on('mouseenter','li',$.proxy(this.mouseenter,this))},eventSupported:function(eventName){var isSupported=eventName in this.$element
if(!isSupported){this.$element.setAttribute(eventName,'return;')
isSupported=typeof this.$element[eventName]==='function'}
return isSupported},move:function(e){if(!this.shown)return
switch(e.keyCode){case 9:case 13:case 27:e.preventDefault()
break
case 38:e.preventDefault()
this.prev()
break
case 40:e.preventDefault()
this.next()
break}
e.stopPropagation()},keydown:function(e){this.suppressKeyPressRepeat=!~$.inArray(e.keyCode,[40,38,9,13,27])
this.move(e)},keypress:function(e){if(this.suppressKeyPressRepeat)return
this.move(e)},keyup:function(e){switch(e.keyCode){case 40:case 38:case 16:case 17:case 18:break
case 9:case 13:if(!this.shown)return
this.select()
break
case 27:if(!this.shown)return
this.hide()
break
default:this.lookup()}
e.stopPropagation()
e.preventDefault()},blur:function(e){var that=this
setTimeout(function(){that.hide()},150)},click:function(e){e.stopPropagation()
e.preventDefault()
this.select()},mouseenter:function(e){this.$menu.find('.active').removeClass('active')
$(e.currentTarget).addClass('active')}}
$.fn.typeahead=function(option){return this.each(function(){var $this=$(this),data=$this.data('typeahead'),options=typeof option=='object'&&option
if(!data)$this.data('typeahead',(data=new Typeahead(this,options)))
if(typeof option=='string')data[option]()})}
$.fn.typeahead.defaults={source:[],items:8,menu:'<ul class="typeahead dropdown-menu"></ul>',item:'<li><a href="#"></a></li>',minLength:1}
$.fn.typeahead.Constructor=Typeahead
$(document).on('focus.typeahead.data-api','[data-provide="typeahead"]',function(e){var $this=$(this)
if($this.data('typeahead'))return
e.preventDefault()
$this.typeahead($this.data())})}(window.jQuery);!function($){"use strict";var Affix=function(element,options){this.options=$.extend({},$.fn.affix.defaults,options)
this.$window=$(window).on('scroll.affix.data-api',$.proxy(this.checkPosition,this)).on('click.affix.data-api',$.proxy(function(){setTimeout($.proxy(this.checkPosition,this),1)},this))
this.$element=$(element)
this.checkPosition()}
Affix.prototype.checkPosition=function(){if(!this.$element.is(':visible'))return
var scrollHeight=$(document).height(),scrollTop=this.$window.scrollTop(),position=this.$element.offset(),offset=this.options.offset,offsetBottom=offset.bottom,offsetTop=offset.top,reset='affix affix-top affix-bottom',affix
if(typeof offset!='object')offsetBottom=offsetTop=offset
if(typeof offsetTop=='function')offsetTop=offset.top()
if(typeof offsetBottom=='function')offsetBottom=offset.bottom()
affix=this.unpin!=null&&(scrollTop+this.unpin<=position.top)?false:offsetBottom!=null&&(position.top+this.$element.height()>=scrollHeight-offsetBottom)?'bottom':offsetTop!=null&&scrollTop<=offsetTop?'top':false
if(this.affixed===affix)return
this.affixed=affix
this.unpin=affix=='bottom'?position.top-scrollTop:null
this.$element.removeClass(reset).addClass('affix'+(affix?'-'+affix:''))}
$.fn.affix=function(option){return this.each(function(){var $this=$(this),data=$this.data('affix'),options=typeof option=='object'&&option
if(!data)$this.data('affix',(data=new Affix(this,options)))
if(typeof option=='string')data[option]()})}
$.fn.affix.Constructor=Affix
$.fn.affix.defaults={offset:0}
$(window).on('load',function(){$('[data-spy="affix"]').each(function(){var $spy=$(this),data=$spy.data()
data.offset=data.offset||{}
data.offsetBottom&&(data.offset.bottom=data.offsetBottom)
data.offsetTop&&(data.offset.top=data.offsetTop)
$spy.affix(data)})})}(window.jQuery);
typeof JSON!="object"&&(JSON={}),function(){"use strict";function f(e){return e<10?"0"+e:e}function quote(e){return escapable.lastIndex=0,escapable.test(e)?'"'+e.replace(escapable,function(e){var t=meta[e];return typeof t=="string"?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+e+'"'}function str(e,t){var n,r,i,s,o=gap,u,a=t[e];a&&typeof a=="object"&&typeof a.toJSON=="function"&&(a=a.toJSON(e)),typeof rep=="function"&&(a=rep.call(t,e,a));switch(typeof a){case"string":return quote(a);case"number":return isFinite(a)?String(a):"null";case"boolean":case"null":return String(a);case"object":if(!a)return"null";gap+=indent,u=[];if(Object.prototype.toString.apply(a)==="[object Array]"){s=a.length;for(n=0;n<s;n+=1)u[n]=str(n,a)||"null";return i=u.length===0?"[]":gap?"[\n"+gap+u.join(",\n"+gap)+"\n"+o+"]":"["+u.join(",")+"]",gap=o,i}if(rep&&typeof rep=="object"){s=rep.length;for(n=0;n<s;n+=1)typeof rep[n]=="string"&&(r=rep[n],i=str(r,a),i&&u.push(quote(r)+(gap?": ":":")+i))}else for(r in a)Object.prototype.hasOwnProperty.call(a,r)&&(i=str(r,a),i&&u.push(quote(r)+(gap?": ":":")+i));return i=u.length===0?"{}":gap?"{\n"+gap+u.join(",\n"+gap)+"\n"+o+"}":"{"+u.join(",")+"}",gap=o,i}}typeof Date.prototype.toJSON!="function"&&(Date.prototype.toJSON=function(e){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(e){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;typeof JSON.stringify!="function"&&(JSON.stringify=function(e,t,n){var r;gap="",indent="";if(typeof n=="number")for(r=0;r<n;r+=1)indent+=" ";else typeof n=="string"&&(indent=n);rep=t;if(!t||typeof t=="function"||typeof t=="object"&&typeof t.length=="number")return str("",{"":e});throw new Error("JSON.stringify")}),typeof JSON.parse!="function"&&(JSON.parse=function(text,reviver){function walk(e,t){var n,r,i=e[t];if(i&&typeof i=="object")for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(r=walk(i,n),r!==undefined?i[n]=r:delete i[n]);return reviver.call(e,t,i)}var j;text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(e){return"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),typeof reviver=="function"?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}(),function(e,t){"use strict";var n=e.History=e.History||{},r=e.jQuery;if(typeof n.Adapter!="undefined")throw new Error("History.js Adapter has already been loaded...");n.Adapter={bind:function(e,t,n){r(e).bind(t,n)},trigger:function(e,t,n){r(e).trigger(t,n)},extractEventData:function(e,n,r){var i=n&&n.originalEvent&&n.originalEvent[e]||r&&r[e]||t;return i},onDomLoad:function(e){r(e)}},typeof n.init!="undefined"&&n.init()}(window),function(e,t){"use strict";var n=e.document,r=e.setTimeout||r,i=e.clearTimeout||i,s=e.setInterval||s,o=e.History=e.History||{};if(typeof o.initHtml4!="undefined")throw new Error("History.js HTML4 Support has already been loaded...");o.initHtml4=function(){if(typeof o.initHtml4.initialized!="undefined")return!1;o.initHtml4.initialized=!0,o.enabled=!0,o.savedHashes=[],o.isLastHash=function(e){var t=o.getHashByIndex(),n;return n=e===t,n},o.isHashEqual=function(e,t){return e=encodeURIComponent(e).replace(/%25/g,"%"),t=encodeURIComponent(t).replace(/%25/g,"%"),e===t},o.saveHash=function(e){return o.isLastHash(e)?!1:(o.savedHashes.push(e),!0)},o.getHashByIndex=function(e){var t=null;return typeof e=="undefined"?t=o.savedHashes[o.savedHashes.length-1]:e<0?t=o.savedHashes[o.savedHashes.length+e]:t=o.savedHashes[e],t},o.discardedHashes={},o.discardedStates={},o.discardState=function(e,t,n){var r=o.getHashByState(e),i;return i={discardedState:e,backState:n,forwardState:t},o.discardedStates[r]=i,!0},o.discardHash=function(e,t,n){var r={discardedHash:e,backState:n,forwardState:t};return o.discardedHashes[e]=r,!0},o.discardedState=function(e){var t=o.getHashByState(e),n;return n=o.discardedStates[t]||!1,n},o.discardedHash=function(e){var t=o.discardedHashes[e]||!1;return t},o.recycleState=function(e){var t=o.getHashByState(e);return o.discardedState(e)&&delete o.discardedStates[t],!0},o.emulated.hashChange&&(o.hashChangeInit=function(){o.checkerFunction=null;var t="",r,i,u,a,f=Boolean(o.getHash());return o.isInternetExplorer()?(r="historyjs-iframe",i=n.createElement("iframe"),i.setAttribute("id",r),i.setAttribute("src","#"),i.style.display="none",n.body.appendChild(i),i.contentWindow.document.open(),i.contentWindow.document.close(),u="",a=!1,o.checkerFunction=function(){if(a)return!1;a=!0;var n=o.getHash(),r=o.getHash(i.contentWindow.document);return n!==t?(t=n,r!==n&&(u=r=n,i.contentWindow.document.open(),i.contentWindow.document.close(),i.contentWindow.document.location.hash=o.escapeHash(n)),o.Adapter.trigger(e,"hashchange")):r!==u&&(u=r,f&&r===""?o.back():o.setHash(r,!1)),a=!1,!0}):o.checkerFunction=function(){var n=o.getHash()||"";return n!==t&&(t=n,o.Adapter.trigger(e,"hashchange")),!0},o.intervalList.push(s(o.checkerFunction,o.options.hashChangeInterval)),!0},o.Adapter.onDomLoad(o.hashChangeInit)),o.emulated.pushState&&(o.onHashChange=function(t){var n=t&&t.newURL||o.getLocationHref(),r=o.getHashByUrl(n),i=null,s=null,u=null,a;return o.isLastHash(r)?(o.busy(!1),!1):(o.doubleCheckComplete(),o.saveHash(r),r&&o.isTraditionalAnchor(r)?(o.Adapter.trigger(e,"anchorchange"),o.busy(!1),!1):(i=o.extractState(o.getFullUrl(r||o.getLocationHref()),!0),o.isLastSavedState(i)?(o.busy(!1),!1):(s=o.getHashByState(i),a=o.discardedState(i),a?(o.getHashByIndex(-2)===o.getHashByState(a.forwardState)?o.back(!1):o.forward(!1),!1):(o.pushState(i.data,i.title,encodeURI(i.url),!1),!0))))},o.Adapter.bind(e,"hashchange",o.onHashChange),o.pushState=function(t,n,r,i){r=encodeURI(r).replace(/%25/g,"%");if(o.getHashByUrl(r))throw new Error("History.js does not support states with fragment-identifiers (hashes/anchors).");if(i!==!1&&o.busy())return o.pushQueue({scope:o,callback:o.pushState,args:arguments,queue:i}),!1;o.busy(!0);var s=o.createStateObject(t,n,r),u=o.getHashByState(s),a=o.getState(!1),f=o.getHashByState(a),l=o.getHash(),c=o.expectedStateId==s.id;return o.storeState(s),o.expectedStateId=s.id,o.recycleState(s),o.setTitle(s),u===f?(o.busy(!1),!1):(o.saveState(s),c||o.Adapter.trigger(e,"statechange"),!o.isHashEqual(u,l)&&!o.isHashEqual(u,o.getShortUrl(o.getLocationHref()))&&o.setHash(u,!1),o.busy(!1),!0)},o.replaceState=function(t,n,r,i){r=encodeURI(r).replace(/%25/g,"%");if(o.getHashByUrl(r))throw new Error("History.js does not support states with fragment-identifiers (hashes/anchors).");if(i!==!1&&o.busy())return o.pushQueue({scope:o,callback:o.replaceState,args:arguments,queue:i}),!1;o.busy(!0);var s=o.createStateObject(t,n,r),u=o.getHashByState(s),a=o.getState(!1),f=o.getHashByState(a),l=o.getStateByIndex(-2);return o.discardState(a,s,l),u===f?(o.storeState(s),o.expectedStateId=s.id,o.recycleState(s),o.setTitle(s),o.saveState(s),o.Adapter.trigger(e,"statechange"),o.busy(!1)):o.pushState(s.data,s.title,s.url,!1),!0}),o.emulated.pushState&&o.getHash()&&!o.emulated.hashChange&&o.Adapter.onDomLoad(function(){o.Adapter.trigger(e,"hashchange")})},typeof o.init!="undefined"&&o.init()}(window),function(e,t){"use strict";var n=e.console||t,r=e.document,i=e.navigator,s=!1,o=e.setTimeout,u=e.clearTimeout,a=e.setInterval,f=e.clearInterval,l=e.JSON,c=e.alert,h=e.History=e.History||{},p=e.history;try{s=e.sessionStorage,s.setItem("TEST","1"),s.removeItem("TEST")}catch(d){s=!1}l.stringify=l.stringify||l.encode,l.parse=l.parse||l.decode;if(typeof h.init!="undefined")throw new Error("History.js Core has already been loaded...");h.init=function(e){return typeof h.Adapter=="undefined"?!1:(typeof h.initCore!="undefined"&&h.initCore(),typeof h.initHtml4!="undefined"&&h.initHtml4(),!0)},h.initCore=function(d){if(typeof h.initCore.initialized!="undefined")return!1;h.initCore.initialized=!0,h.options=h.options||{},h.options.hashChangeInterval=h.options.hashChangeInterval||100,h.options.safariPollInterval=h.options.safariPollInterval||500,h.options.doubleCheckInterval=h.options.doubleCheckInterval||500,h.options.disableSuid=h.options.disableSuid||!1,h.options.storeInterval=h.options.storeInterval||1e3,h.options.busyDelay=h.options.busyDelay||250,h.options.debug=h.options.debug||!1,h.options.initialTitle=h.options.initialTitle||r.title,h.options.html4Mode=h.options.html4Mode||!1,h.options.delayInit=h.options.delayInit||!1,h.intervalList=[],h.clearAllIntervals=function(){var e,t=h.intervalList;if(typeof t!="undefined"&&t!==null){for(e=0;e<t.length;e++)f(t[e]);h.intervalList=null}},h.debug=function(){(h.options.debug||!1)&&h.log.apply(h,arguments)},h.log=function(){var e=typeof n!="undefined"&&typeof n.log!="undefined"&&typeof n.log.apply!="undefined",t=r.getElementById("log"),i,s,o,u,a;e?(u=Array.prototype.slice.call(arguments),i=u.shift(),typeof n.debug!="undefined"?n.debug.apply(n,[i,u]):n.log.apply(n,[i,u])):i="\n"+arguments[0]+"\n";for(s=1,o=arguments.length;s<o;++s){a=arguments[s];if(typeof a=="object"&&typeof l!="undefined")try{a=l.stringify(a)}catch(f){}i+="\n"+a+"\n"}return t?(t.value+=i+"\n-----\n",t.scrollTop=t.scrollHeight-t.clientHeight):e||c(i),!0},h.getInternetExplorerMajorVersion=function(){var e=h.getInternetExplorerMajorVersion.cached=typeof h.getInternetExplorerMajorVersion.cached!="undefined"?h.getInternetExplorerMajorVersion.cached:function(){var e=3,t=r.createElement("div"),n=t.getElementsByTagName("i");while((t.innerHTML="<!--[if gt IE "+ ++e+"]><i></i><![endif]-->")&&n[0]);return e>4?e:!1}();return e},h.isInternetExplorer=function(){var e=h.isInternetExplorer.cached=typeof h.isInternetExplorer.cached!="undefined"?h.isInternetExplorer.cached:Boolean(h.getInternetExplorerMajorVersion());return e},h.options.html4Mode?h.emulated={pushState:!0,hashChange:!0}:h.emulated={pushState:!Boolean(e.history&&e.history.pushState&&e.history.replaceState&&!/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(i.userAgent)&&!/AppleWebKit\/5([0-2]|3[0-2])/i.test(i.userAgent)),hashChange:Boolean(!("onhashchange"in e||"onhashchange"in r)||h.isInternetExplorer()&&h.getInternetExplorerMajorVersion()<8)},h.enabled=!h.emulated.pushState,h.bugs={setHash:Boolean(!h.emulated.pushState&&i.vendor==="Apple Computer, Inc."&&/AppleWebKit\/5([0-2]|3[0-3])/.test(i.userAgent)),safariPoll:Boolean(!h.emulated.pushState&&i.vendor==="Apple Computer, Inc."&&/AppleWebKit\/5([0-2]|3[0-3])/.test(i.userAgent)),ieDoubleCheck:Boolean(h.isInternetExplorer()&&h.getInternetExplorerMajorVersion()<8),hashEscape:Boolean(h.isInternetExplorer()&&h.getInternetExplorerMajorVersion()<7)},h.isEmptyObject=function(e){for(var t in e)if(e.hasOwnProperty(t))return!1;return!0},h.cloneObject=function(e){var t,n;return e?(t=l.stringify(e),n=l.parse(t)):n={},n},h.getRootUrl=function(){var e=r.location.protocol+"//"+(r.location.hostname||r.location.host);if(r.location.port||!1)e+=":"+r.location.port;return e+="/",e},h.getBaseHref=function(){var e=r.getElementsByTagName("base"),t=null,n="";return e.length===1&&(t=e[0],n=t.href.replace(/[^\/]+$/,"")),n=n.replace(/\/+$/,""),n&&(n+="/"),n},h.getBaseUrl=function(){var e=h.getBaseHref()||h.getBasePageUrl()||h.getRootUrl();return e},h.getPageUrl=function(){var e=h.getState(!1,!1),t=(e||{}).url||h.getLocationHref(),n;return n=t.replace(/\/+$/,"").replace(/[^\/]+$/,function(e,t,n){return/\./.test(e)?e:e+"/"}),n},h.getBasePageUrl=function(){var e=h.getLocationHref().replace(/[#\?].*/,"").replace(/[^\/]+$/,function(e,t,n){return/[^\/]$/.test(e)?"":e}).replace(/\/+$/,"")+"/";return e},h.getFullUrl=function(e,t){var n=e,r=e.substring(0,1);return t=typeof t=="undefined"?!0:t,/[a-z]+\:\/\//.test(e)||(r==="/"?n=h.getRootUrl()+e.replace(/^\/+/,""):r==="#"?n=h.getPageUrl().replace(/#.*/,"")+e:r==="?"?n=h.getPageUrl().replace(/[\?#].*/,"")+e:t?n=h.getBaseUrl()+e.replace(/^(\.\/)+/,""):n=h.getBasePageUrl()+e.replace(/^(\.\/)+/,"")),n.replace(/\#$/,"")},h.getShortUrl=function(e){var t=e,n=h.getBaseUrl(),r=h.getRootUrl();return h.emulated.pushState&&(t=t.replace(n,"")),t=t.replace(r,"/"),h.isTraditionalAnchor(t)&&(t="./"+t),t=t.replace(/^(\.\/)+/g,"./").replace(/\#$/,""),t},h.getLocationHref=function(e){return e=e||r,e.URL===e.location.href?e.location.href:e.location.href===decodeURIComponent(e.URL)?e.URL:e.location.hash&&decodeURIComponent(e.location.href.replace(/^[^#]+/,""))===e.location.hash?e.location.href:e.URL.indexOf("#")==-1&&e.location.href.indexOf("#")!=-1?e.location.href:e.URL||e.location.href},h.store={},h.idToState=h.idToState||{},h.stateToId=h.stateToId||{},h.urlToId=h.urlToId||{},h.storedStates=h.storedStates||[],h.savedStates=h.savedStates||[],h.normalizeStore=function(){h.store.idToState=h.store.idToState||{},h.store.urlToId=h.store.urlToId||{},h.store.stateToId=h.store.stateToId||{}},h.getState=function(e,t){typeof e=="undefined"&&(e=!0),typeof t=="undefined"&&(t=!0);var n=h.getLastSavedState();return!n&&t&&(n=h.createStateObject()),e&&(n=h.cloneObject(n),n.url=n.cleanUrl||n.url),n},h.getIdByState=function(e){var t=h.extractId(e.url),n;if(!t){n=h.getStateString(e);if(typeof h.stateToId[n]!="undefined")t=h.stateToId[n];else if(typeof h.store.stateToId[n]!="undefined")t=h.store.stateToId[n];else{for(;;){t=(new Date).getTime()+String(Math.random()).replace(/\D/g,"");if(typeof h.idToState[t]=="undefined"&&typeof h.store.idToState[t]=="undefined")break}h.stateToId[n]=t,h.idToState[t]=e}}return t},h.normalizeState=function(e){var t,n;if(!e||typeof e!="object")e={};if(typeof e.normalized!="undefined")return e;if(!e.data||typeof e.data!="object")e.data={};return t={},t.normalized=!0,t.title=e.title||"",t.url=h.getFullUrl(e.url?e.url:h.getLocationHref()),t.hash=h.getShortUrl(t.url),t.data=h.cloneObject(e.data),t.id=h.getIdByState(t),t.cleanUrl=t.url.replace(/\??\&_suid.*/,""),t.url=t.cleanUrl,n=!h.isEmptyObject(t.data),(t.title||n)&&h.options.disableSuid!==!0&&(t.hash=h.getShortUrl(t.url).replace(/\??\&_suid.*/,""),/\?/.test(t.hash)||(t.hash+="?"),t.hash+="&_suid="+t.id),t.hashedUrl=h.getFullUrl(t.hash),(h.emulated.pushState||h.bugs.safariPoll)&&h.hasUrlDuplicate(t)&&(t.url=t.hashedUrl),t},h.createStateObject=function(e,t,n){var r={data:e,title:t,url:n};return r=h.normalizeState(r),r},h.getStateById=function(e){e=String(e);var n=h.idToState[e]||h.store.idToState[e]||t;return n},h.getStateString=function(e){var t,n,r;return t=h.normalizeState(e),n={data:t.data,title:e.title,url:e.url},r=l.stringify(n),r},h.getStateId=function(e){var t,n;return t=h.normalizeState(e),n=t.id,n},h.getHashByState=function(e){var t,n;return t=h.normalizeState(e),n=t.hash,n},h.extractId=function(e){var t,n,r,i;return e.indexOf("#")!=-1?i=e.split("#")[0]:i=e,n=/(.*)\&_suid=([0-9]+)$/.exec(i),r=n?n[1]||e:e,t=n?String(n[2]||""):"",t||!1},h.isTraditionalAnchor=function(e){var t=!/[\/\?\.]/.test(e);return t},h.extractState=function(e,t){var n=null,r,i;return t=t||!1,r=h.extractId(e),r&&(n=h.getStateById(r)),n||(i=h.getFullUrl(e),r=h.getIdByUrl(i)||!1,r&&(n=h.getStateById(r)),!n&&t&&!h.isTraditionalAnchor(e)&&(n=h.createStateObject(null,null,i))),n},h.getIdByUrl=function(e){var n=h.urlToId[e]||h.store.urlToId[e]||t;return n},h.getLastSavedState=function(){return h.savedStates[h.savedStates.length-1]||t},h.getLastStoredState=function(){return h.storedStates[h.storedStates.length-1]||t},h.hasUrlDuplicate=function(e){var t=!1,n;return n=h.extractState(e.url),t=n&&n.id!==e.id,t},h.storeState=function(e){return h.urlToId[e.url]=e.id,h.storedStates.push(h.cloneObject(e)),e},h.isLastSavedState=function(e){var t=!1,n,r,i;return h.savedStates.length&&(n=e.id,r=h.getLastSavedState(),i=r.id,t=n===i),t},h.saveState=function(e){return h.isLastSavedState(e)?!1:(h.savedStates.push(h.cloneObject(e)),!0)},h.getStateByIndex=function(e){var t=null;return typeof e=="undefined"?t=h.savedStates[h.savedStates.length-1]:e<0?t=h.savedStates[h.savedStates.length+e]:t=h.savedStates[e],t},h.getCurrentIndex=function(){var e=null;return h.savedStates.length<1?e=0:e=h.savedStates.length-1,e},h.getHash=function(e){var t=h.getLocationHref(e),n;return n=h.getHashByUrl(t),n},h.unescapeHash=function(e){var t=h.normalizeHash(e);return t=decodeURIComponent(t),t},h.normalizeHash=function(e){var t=e.replace(/[^#]*#/,"").replace(/#.*/,"");return t},h.setHash=function(e,t){var n,i;return t!==!1&&h.busy()?(h.pushQueue({scope:h,callback:h.setHash,args:arguments,queue:t}),!1):(h.busy(!0),n=h.extractState(e,!0),n&&!h.emulated.pushState?h.pushState(n.data,n.title,n.url,!1):h.getHash()!==e&&(h.bugs.setHash?(i=h.getPageUrl(),h.pushState(null,null,i+"#"+e,!1)):r.location.hash=e),h)},h.escapeHash=function(t){var n=h.normalizeHash(t);return n=e.encodeURIComponent(n),h.bugs.hashEscape||(n=n.replace(/\%21/g,"!").replace(/\%26/g,"&").replace(/\%3D/g,"=").replace(/\%3F/g,"?")),n},h.getHashByUrl=function(e){var t=String(e).replace(/([^#]*)#?([^#]*)#?(.*)/,"$2");return t=h.unescapeHash(t),t},h.setTitle=function(e){var t=e.title,n;t||(n=h.getStateByIndex(0),n&&n.url===e.url&&(t=n.title||h.options.initialTitle));try{r.getElementsByTagName("title")[0].innerHTML=t.replace("<","&lt;").replace(">","&gt;").replace(" & "," &amp; ")}catch(i){}return r.title=t,h},h.queues=[],h.busy=function(e){typeof e!="undefined"?h.busy.flag=e:typeof h.busy.flag=="undefined"&&(h.busy.flag=!1);if(!h.busy.flag){u(h.busy.timeout);var t=function(){var e,n,r;if(h.busy.flag)return;for(e=h.queues.length-1;e>=0;--e){n=h.queues[e];if(n.length===0)continue;r=n.shift(),h.fireQueueItem(r),h.busy.timeout=o(t,h.options.busyDelay)}};h.busy.timeout=o(t,h.options.busyDelay)}return h.busy.flag},h.busy.flag=!1,h.fireQueueItem=function(e){return e.callback.apply(e.scope||h,e.args||[])},h.pushQueue=function(e){return h.queues[e.queue||0]=h.queues[e.queue||0]||[],h.queues[e.queue||0].push(e),h},h.queue=function(e,t){return typeof e=="function"&&(e={callback:e}),typeof t!="undefined"&&(e.queue=t),h.busy()?h.pushQueue(e):h.fireQueueItem(e),h},h.clearQueue=function(){return h.busy.flag=!1,h.queues=[],h},h.stateChanged=!1,h.doubleChecker=!1,h.doubleCheckComplete=function(){return h.stateChanged=!0,h.doubleCheckClear(),h},h.doubleCheckClear=function(){return h.doubleChecker&&(u(h.doubleChecker),h.doubleChecker=!1),h},h.doubleCheck=function(e){return h.stateChanged=!1,h.doubleCheckClear(),h.bugs.ieDoubleCheck&&(h.doubleChecker=o(function(){return h.doubleCheckClear(),h.stateChanged||e(),!0},h.options.doubleCheckInterval)),h},h.safariStatePoll=function(){var t=h.extractState(h.getLocationHref()),n;if(!h.isLastSavedState(t))return n=t,n||(n=h.createStateObject()),h.Adapter.trigger(e,"popstate"),h;return},h.back=function(e){return e!==!1&&h.busy()?(h.pushQueue({scope:h,callback:h.back,args:arguments,queue:e}),!1):(h.busy(!0),h.doubleCheck(function(){h.back(!1)}),p.go(-1),!0)},h.forward=function(e){return e!==!1&&h.busy()?(h.pushQueue({scope:h,callback:h.forward,args:arguments,queue:e}),!1):(h.busy(!0),h.doubleCheck(function(){h.forward(!1)}),p.go(1),!0)},h.go=function(e,t){var n;if(e>0)for(n=1;n<=e;++n)h.forward(t);else{if(!(e<0))throw new Error("History.go: History.go requires a positive or negative integer passed.");for(n=-1;n>=e;--n)h.back(t)}return h};if(h.emulated.pushState){var v=function(){};h.pushState=h.pushState||v,h.replaceState=h.replaceState||v}else h.onPopState=function(t,n){var r=!1,i=!1,s,o;return h.doubleCheckComplete(),s=h.getHash(),s?(o=h.extractState(s||h.getLocationHref(),!0),o?h.replaceState(o.data,o.title,o.url,!1):(h.Adapter.trigger(e,"anchorchange"),h.busy(!1)),h.expectedStateId=!1,!1):(r=h.Adapter.extractEventData("state",t,n)||!1,r?i=h.getStateById(r):h.expectedStateId?i=h.getStateById(h.expectedStateId):i=h.extractState(h.getLocationHref()),i||(i=h.createStateObject(null,null,h.getLocationHref())),h.expectedStateId=!1,h.isLastSavedState(i)?(h.busy(!1),!1):(h.storeState(i),h.saveState(i),h.setTitle(i),h.Adapter.trigger(e,"statechange"),h.busy(!1),!0))},h.Adapter.bind(e,"popstate",h.onPopState),h.pushState=function(t,n,r,i){if(h.getHashByUrl(r)&&h.emulated.pushState)throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(i!==!1&&h.busy())return h.pushQueue({scope:h,callback:h.pushState,args:arguments,queue:i}),!1;h.busy(!0);var s=h.createStateObject(t,n,r);return h.isLastSavedState(s)?h.busy(!1):(h.storeState(s),h.expectedStateId=s.id,p.pushState(s.id,s.title,s.url),h.Adapter.trigger(e,"popstate")),!0},h.replaceState=function(t,n,r,i){if(h.getHashByUrl(r)&&h.emulated.pushState)throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(i!==!1&&h.busy())return h.pushQueue({scope:h,callback:h.replaceState,args:arguments,queue:i}),!1;h.busy(!0);var s=h.createStateObject(t,n,r);return h.isLastSavedState(s)?h.busy(!1):(h.storeState(s),h.expectedStateId=s.id,p.replaceState(s.id,s.title,s.url),h.Adapter.trigger(e,"popstate")),!0};if(s){try{h.store=l.parse(s.getItem("History.store"))||{}}catch(m){h.store={}}h.normalizeStore()}else h.store={},h.normalizeStore();h.Adapter.bind(e,"unload",h.clearAllIntervals),h.saveState(h.storeState(h.extractState(h.getLocationHref(),!0))),s&&(h.onUnload=function(){var e,t,n;try{e=l.parse(s.getItem("History.store"))||{}}catch(r){e={}}e.idToState=e.idToState||{},e.urlToId=e.urlToId||{},e.stateToId=e.stateToId||{};for(t in h.idToState){if(!h.idToState.hasOwnProperty(t))continue;e.idToState[t]=h.idToState[t]}for(t in h.urlToId){if(!h.urlToId.hasOwnProperty(t))continue;e.urlToId[t]=h.urlToId[t]}for(t in h.stateToId){if(!h.stateToId.hasOwnProperty(t))continue;e.stateToId[t]=h.stateToId[t]}h.store=e,h.normalizeStore(),n=l.stringify(e);try{s.setItem("History.store",n)}catch(i){if(i.code!==DOMException.QUOTA_EXCEEDED_ERR)throw i;s.length&&(s.removeItem("History.store"),s.setItem("History.store",n))}},h.intervalList.push(a(h.onUnload,h.options.storeInterval)),h.Adapter.bind(e,"beforeunload",h.onUnload),h.Adapter.bind(e,"unload",h.onUnload));if(!h.emulated.pushState){h.bugs.safariPoll&&h.intervalList.push(a(h.safariStatePoll,h.options.safariPollInterval));if(i.vendor==="Apple Computer, Inc."||(i.appCodeName||"")==="Mozilla")h.Adapter.bind(e,"hashchange",function(){h.Adapter.trigger(e,"popstate")}),h.getHash()&&h.Adapter.onDomLoad(function(){h.Adapter.trigger(e,"hashchange")})}},(!h.options||!h.options.delayInit)&&h.init()}(window)
'use strict';function WsShippingEstimator(options){options=options||{};this.class=options.class||null;this.shippingOptions=options.shippingOptions||null;this.currentlySelectedShippingOption=options.selectedShippingOption||null;this.selectedProviderId=options.selectedProviderId||null;this.selectedPriorityLabel=options.selectedPriorityLabel||null;this.selectedCountryName=options.shippingCountryName||null;this.selectedCountryCode=options.shippingCountryCode||null;this.shippingCity=options.shippingCity||null;this.shippingStateCode=options.shippingStateCode||null;this.messages=options.messages||null;this.updateOnLoad=options.updateOnLoad||false;this.getShippingRatesEndpoint=options.getShippingRatesEndpoint||'';this.setShippingOptionEndpoint=options.setShippingOptionEndpoint||'';if(typeof this.class!=='string'){throw new Error('Must provide a string value for the class option.');}
this.$root=$('.'+this.class);if(this.$root.length===0){throw new Error('Unable to find element on page with class='+this.class);}
this.$estimatorZipError=$('.estimator-zip-error');this.$estimatorZipErrorText=this.$estimatorZipError.find('p');this.$estimateShippingAndTaxesLink=this.$root.find('.estimate-shipping-and-taxes-link');this.$shippingPostalEntry=this.$root.find('.shipping-postal-entry');this.$shippingPostalInput=this.$shippingPostalEntry.find('.shipping-postal-input');this.$shippingCalculateButton=this.$shippingPostalEntry.find('button');this.$shippingCountryPicker=this.$root.find('.shipping-country-picker');this.$selectedCountryLink=this.$root.find('.shipping-country-link');this.$shippingOptions=this.$root.filter('.shipping-options');this.$closeShippingOptions=this.$shippingOptions.find('.close-shipping-options');this.$shippingEstimateLine=this.$root.filter('.shipping-estimate-line');this.$shippingPostalLink=this.$shippingEstimateLine.find('.shipping-postal-link');this.$shippingEstimate=this.$shippingEstimateLine.find('.shipping-estimate');this.$taxEstimateLine=this.$root.filter('.tax-estimate-line');this.$taxEstimate=this.$taxEstimateLine.find('.tax-estimate');this.$shippingCityStateLink=this.$taxEstimateLine.find('.shipping-city-state-link');this.$cartSubtotal=$('.cart-subtotal');this.$totalEstimate=$('.wsshippingestimator-total-estimate');this.$estimatorPlaceholder=$('.webstore-estimator-placeholder');this.calculatingFields=[this.$totalEstimate,this.$shippingEstimate,this.$taxEstimate];this.screens={'no-estimates':{'show':[this.$estimateShippingAndTaxesLink],'hide':[this.$shippingPostalEntry,this.$shippingCountryPicker,this.$selectedCountryLink,this.$shippingOptions,this.$taxEstimateLine,this.$shippingEstimateLine]},'show-estimates':{'show':[this.$shippingEstimateLine,this.$taxEstimateLine],'hide':[this.$estimateShippingAndTaxesLink,this.$shippingCountryPicker,this.$selectedCountryLink]},'entering-postal':{'show':[this.$estimateShippingAndTaxesLink,this.$selectedCountryLink,this.$shippingPostalEntry,this.$estimatorPlaceholder],'hide':[this.$shippingCountryPicker,this.$shippingOptions,this.$taxEstimateLine,this.$shippingEstimateLine]},'choosing-country':{'show':[this.$estimateShippingAndTaxesLink,this.$selectedCountryLink,this.$shippingCountryPicker],'hide':[this.$shippingPostalEntry,this.$shippingOptions,this.$taxEstimateLine,this.$shippingEstimateLine]},'choosing-shipping-option':{'show':[this.$shippingEstimateLine,this.$taxEstimateLine,this.$shippingOptions],'hide':[this.$shippingPostalEntry,this.$shippingCountryPicker,this.$selectedCountryLink,this.$estimateShippingAndTaxesLink,this.$estimatorPlaceholder]},'shipping-option-chosen':{'show':[this.$shippingEstimateLine,this.$taxEstimateLine],'hide':[this.$shippingOptions,this.$shippingPostalEntry,this.$shippingCountryPicker,this.$selectedCountryLink,this.$estimateShippingAndTaxesLink,this.$estimatorPlaceholder]}};this.$shippingPostalInput.blur(function(e){this.$shippingPostalLink.html(e.target.value);this.$shippingPostalInput.val(e.target.value);}.bind(this));if(this.shippingOptions!==null){this.redrawShippingOptions(this.shippingOptions);this.showScreen('shipping-option-chosen');}
if(this.messages!==null){this.handleMessages(this.messages);}
this.setCityStateLinkValue(this.shippingCity,this.shippingStateCode);if(this.updateOnLoad===true){this.showScreen('show-estimates');this.updateShippingEstimates();}}
WsShippingEstimator.prototype.showScreen=function(screenId,hideFunction){var screenSettings=this.screens[screenId],elementToShow,elementToHide,i,len;hideFunction=hideFunction||'hide';if(screenSettings===undefined){throw new Error('No screen called '+screenId+' defined.');}
for(i=0,len=screenSettings.hide.length;i<len;i+=1){elementToHide=screenSettings.hide[i];if(elementToHide.is(':visible')){elementToHide[hideFunction]();}}
for(i=0,len=screenSettings.show.length;i<len;i+=1){elementToShow=screenSettings.show[i];if(elementToShow.is(':hidden')){elementToShow.fadeIn();}}};WsShippingEstimator.prototype.setSelectedCountry=function(option){this.selectedCountryName=option.text();this.selectedCountryCode=option.val();this.$selectedCountryLink.html(option.text());this.$shippingCountryPicker.val(option.val());};WsShippingEstimator.prototype.addShippingOption=function(shippingOption){var li=$('<li>').append($('<label>').addClass('radio').append($('<input>').attr({type:'radio',name:'shipping_option',value:shippingOption.speedId,'data-formatted-shipping-price':shippingOption.formattedShippingPrice,'data-formatted-cart-tax':shippingOption.formattedCartTax,'data-formatted-cart-total':shippingOption.formattedCartTotal,'data-provider-id':shippingOption.providerId,'data-priority-id':shippingOption.priorityId,'data-priority-label':shippingOption.priorityLabel})).append(shippingOption.shippingLabel).append($('<small>').append(shippingOption.formattedShippingPrice).attr({class:'estimator-shipping-option'})).change(function(e){this.selectedShippingOption(e.target);}.bind(this)));this.$shippingOptions.find('ol').append(li);};WsShippingEstimator.prototype.toggleShowShippingOptions=function(){if(this.$shippingOptions.is(':visible')){this.showScreen('shipping-option-chosen','fadeOut');}else{this.showScreen('choosing-shipping-option');}};WsShippingEstimator.prototype.selectedShippingOption=function(selectedOption){this.selectedProviderId=$(selectedOption).attr('data-provider-id');this.selectedPriorityLabel=$(selectedOption).attr('data-priority-label');this.selectShippingOption(this.selectedProviderId,this.selectedPriorityLabel);this.updateEstimatesFromOptions(this.getSelectedShippingOption());$.post(this.setShippingOptionEndpoint,{'CheckoutForm[shippingProviderId]':$(selectedOption).attr('data-provider-id'),'CheckoutForm[shippingPriorityLabel]':$(selectedOption).attr('data-priority-label')});};WsShippingEstimator.prototype.selectShippingOption=function(providerId,priorityLabel){if(providerId===null||priorityLabel===null){this.$shippingOptions.each(function(idx,option){$(option).find('input').first().prop('checked',true);});return;}
var didSelectSomething=false;this.$shippingOptions.find('input').each(function(inputIdx,input){if(typeof $(input).attr('data-provider-id')==='undefined'||typeof $(input).attr('data-priority-label')==='undefined'){return;}
if($(input).attr('data-provider-id').toString()===providerId.toString()&&$(input).attr('data-priority-label').toString()===priorityLabel.toString()){didSelectSomething=true;$(input).prop('checked',true);}});};WsShippingEstimator.prototype.redrawShippingOptions=function(shippingOptions){if($.isArray(shippingOptions)===false){throw new Error('shippingOptions must be an array.');}
this.$shippingOptions.find('ol').html('');for(var i=0,len=shippingOptions.length;i<len;i+=1){this.addShippingOption(shippingOptions[i]);}
this.selectShippingOption(this.selectedProviderId,this.selectedPriorityLabel);this.updateEstimatesFromResponse(this.currentlySelectedShippingOption);};WsShippingEstimator.prototype.getSelectedShippingOption=function(){return this.$shippingOptions.find(':checked');};WsShippingEstimator.prototype.getEstimatesFromOptions=function(selectedShippingOption){return{shippingEstimate:selectedShippingOption.attr('data-formatted-shipping-price'),taxEstimate:selectedShippingOption.attr('data-formatted-cart-tax'),totalEstimate:selectedShippingOption.attr('data-formatted-cart-total')};};WsShippingEstimator.prototype.updateEstimatesFromOptions=function(selectedShippingOption){if(selectedShippingOption.length!==0){this.updateEstimates(this.getEstimatesFromOptions(selectedShippingOption));}};WsShippingEstimator.prototype.getEstimatesFromResponse=function(currentlySelectedShippingOption){return{shippingEstimate:currentlySelectedShippingOption.formattedShippingPrice,taxEstimate:currentlySelectedShippingOption.formattedCartTax,totalEstimate:currentlySelectedShippingOption.formattedCartTotal};};WsShippingEstimator.prototype.updateEstimatesFromResponse=function(currentlySelectedShippingOption){if(currentlySelectedShippingOption!==null){this.updateEstimates(this.getEstimatesFromResponse(currentlySelectedShippingOption));}};WsShippingEstimator.prototype.updateEstimates=function(estimates){this.$shippingEstimate.html(estimates.shippingEstimate);this.$taxEstimate.html(estimates.taxEstimate);this.$totalEstimate.html(estimates.totalEstimate);};WsShippingEstimator.prototype.selectedCountry=function(element){this.setSelectedCountry($(element).find(':selected'));this.showScreen('entering-postal');};WsShippingEstimator.prototype.setCityStateLinkValue=function(city,state){var values=[];if(city!==null)
{values.push(city);}
if(state!==null)
{values.push(state);}
this.$shippingCityStateLink.html(values.join(', '));};WsShippingEstimator.prototype.handleMessages=function(messages){var message;for(var i=0,len=messages.length;i<len;i+=1){message=messages[i];switch(message.code){case'WARN':this.addShippingOptionsTopMessage(message.message);this.showScreen('choosing-shipping-option');break;case'INFOTOP':this.addShippingOptionsTopMessage(message.message,'grey');break;case'INFO':this.addShippingOptionsBottomMessage(message.message);break;}}};WsShippingEstimator.prototype.addShippingOptionsBottomMessage=function(messageText){this.$shippingOptions.find('ol').append($('<li>').addClass('webstore-shipping-choices-more').html(messageText));};WsShippingEstimator.prototype.addShippingOptionsTopMessage=function(messageText,extraClass){this.$shippingOptions.find('ol').prepend($('<li>').addClass('webstore-shipping-choices-notice').addClass(extraClass).html(messageText));};WsShippingEstimator.prototype.getPostal=function(){return this.$shippingPostalInput.val();};WsShippingEstimator.prototype.calculateShippingEstimates=function(){var deferred=$.Deferred();var zippoPostal=this.getPostal();if(zippoPostal===''){this.$estimatorZipErrorText.html(zipCodeError);return deferred.reject();}
return this.updateShippingEstimates();};WsShippingEstimator.prototype.updateShippingEstimates=function(){var deferred=$.Deferred();var zippoPostal=this.getPostal();switch(this.selectedCountryCode){case'GB':case'CA':zippoPostal=zippoPostal.substring(0,3);break;}
var addressLookup=$.Deferred();if(this.selectedCountryCode===''||zippoPostal===''){if(this.shippingOptions===null){deferred.reject();return deferred;}else{this.setCityStateLinkValue(null,null);addressLookup.resolve();}}else{var uri=this.selectedCountryCode+'/'+zippoPostal;$.ajax({url:'http://api.zippopotam.us/'+uri,type:'GET',datatype:'json',crossDomain:true}).always(function(placeData){$('.estimator-zip-error').addClass('hide');var city=null,stateCode=null;if(placeData.places!==undefined){city=placeData.places[0]['place name'];stateCode=placeData.places[0]['state abbreviation'];this.setCityStateLinkValue(city,stateCode);addressLookup.resolve(city,stateCode);}else{this.setCityStateLinkValue(null,null);if(placeData.statusText==='Not Found'){this.$estimatorZipErrorText.html(zipCodeError);}else{this.$estimatorZipErrorText.html(zippoUnhandledError);}
addressLookup.reject();}}.bind(this));}
addressLookup.done(function(city,stateCode){this.toggleShowCalculatingOnFields();$.post(this.getShippingRatesEndpoint,{'CheckoutForm[shippingCountryCode]':this.selectedCountryCode,'CheckoutForm[shippingCity]':city,'CheckoutForm[shippingStateCode]':stateCode,'CheckoutForm[shippingPostal]':this.getPostal()}).done(function(shippingRatesResponse){if(typeof shippingRatesResponse.result==='undefined'||shippingRatesResponse.result!=='success'){this.$totalEstimate.html(this.$cartSubtotal.html());this.$estimatorZipErrorText.html(zipCodeError);return deferred.reject();}
var options=shippingRatesResponse.wsShippingEstimatorOptions;this.redrawShippingOptions(options.shippingOptions);this.handleMessages(options.messages);this.selectedProviderId=options.selectedProviderId||null;this.selectedPriorityLabel=options.selectedPriorityLabel||null;this.selectShippingOption(this.selectedProviderId,this.selectedPriorityLabel);this.currentlySelectedShippingOption=options.selectedShippingOption||null;if(this.currentlySelectedShippingOption===null){this.updateEstimatesFromOptions(this.getSelectedShippingOption());}else{this.updateEstimatesFromResponse(this.currentlySelectedShippingOption);}
if(shippingRatesResponse.taxModeChangedMessage!==null){$('.pricechange').show();$('.pricechange').html(shippingRatesResponse.taxModeChangedMessage);}else{$('.pricechange').hide();}
deferred.resolve(shippingRatesResponse);}.bind(this));}.bind(this)).fail(function(){deferred.reject();}.bind(this));return deferred.promise();};WsShippingEstimator.prototype.toggleLoadingSpinner=function(){if(this.$shippingCalculateButton.find('.fa-circle-o-notch').length>0)
{this.$shippingCalculateButton.removeClass('inset-spinner');this.$shippingCalculateButton.html(strCalculateButton);this.$shippingCalculateButton.prop('disabled',false);}
else
{this.$shippingCalculateButton.addClass('inset-spinner');this.$shippingCalculateButton.html('<i class=\'fa fa-circle-o-notch fa-spin fa-lg\'></i>');this.$shippingCalculateButton.prop('disabled','disabled');}};WsShippingEstimator.prototype.toggleShowCalculatingOnFields=function(){$.each(this.calculatingFields,function(idx,el){el.html(calculatingLabel);});};WsShippingEstimator.prototype.promoCodeChange=function(result){if(this.selectedProviderId!==null&&this.selectedPriorityLabel!==null){this.updateShippingEstimates();}};
'use strict';function Checkout(options){this.applyButtonLabel=options.applyButtonLabel||null;this.removeButtonLabel=options.removeButtonLabel||null;this.applyPromoCodeEndpoint=options.applyPromoCodeEndpoint;this.removePromoCodeEndpoint=options.removePromoCodeEndpoint;this.clearCartEndpoint=options.ClearCartEndpoint;if(this.applyButtonLabel===null||this.removeButtonLabel===null){throw new Error('Translation missing for promo code button');}}
Checkout.prototype.ajaxTogglePromoCode=function(cartId,updateCartTotals){updateCartTotals=updateCartTotals||false;if($('.promocode-apply').hasClass('promocode-applied')){return this.ajaxRemovePromoCode(cartId,updateCartTotals);}else{return this.ajaxApplyPromoCode(cartId,updateCartTotals);}};Checkout.prototype.ajaxApplyPromoCode=function(cartId,updateCartTotals){var promoCodeValue=$('#'+cartId).val();updateCartTotals=updateCartTotals||false;$('#'+cartId+'_em_').hide();var result=$.Deferred();var promoCodeSuccess=function(shoppingCart){this.applyPromoCode(cartId,shoppingCart.promoCode);this.redrawCart(shoppingCart,cartId);if(shoppingCart.cartItems.length===0){this.ajaxRemovePromoCode(cartId);$('.webstore-promo-line').remove();}}.bind(this);$.ajax({url:this.applyPromoCodeEndpoint,data:{promoCode:promoCodeValue,updateCartTotals:updateCartTotals},type:'POST',dataType:'json'}).done(function(response){switch(response.applyResult.action){case'alert':alert(response.applyResult.message);break;case'error':$('#'+cartId+'_em_').find('p').text(response.applyResult.message).end().hide().fadeIn();break;case'triggerCalc':alert(response.applyResult.message);promoCodeSuccess(response.shoppingCart);break;case'success':promoCodeSuccess(response.shoppingCart);break;}
result.resolve(response.applyResult.action);}.bind(this)).fail(function(){result.reject();});return result.promise();};Checkout.prototype.ajaxRemovePromoCode=function(cartId,updateCartTotals){var result=$.Deferred();updateCartTotals=updateCartTotals||false;$.ajax({type:'POST',url:this.removePromoCodeEndpoint,dataType:'json',data:{updateCartTotals:updateCartTotals}}).done(function(response){this.removePromoCode(cartId);this.redrawCart(response.shoppingCart,cartId);result.resolve('triggerCalc');}.bind(this)).fail(function(){result.reject();});return result.promise();};Checkout.prototype.ajaxTogglePromoCodeEnterKey=function(e,cartId,updateCartTotals){updateCartTotals=updateCartTotals||false;if(e.keyCode===13){e.preventDefault();return this.ajaxTogglePromoCode(cartId,updateCartTotals);}
var deferred=$.Deferred();deferred.reject();return deferred.promise();};Checkout.prototype.redrawCart=function(shoppingCart,cartId){var rowBaseId='cart_row_',cartHasDiscount=false;if(shoppingCart.cartItems===undefined){throw new Error('shoppingCart.cartItems must be defined');}
for(var itemIdx=0,numItems=shoppingCart.cartItems.length;itemIdx<numItems;itemIdx+=1){var cartItem=shoppingCart.cartItems[itemIdx];var row=$('#'+rowBaseId+cartItem.id);if(row.length===0){continue;}
var unitHTML='';if(parseFloat(cartItem.discount)>0){cartHasDiscount=true;unitHTML='<strike>'+cartItem.sellFormatted+' '+advcheckoutTranslation.EACH_SUFFIX+'</strike>'+' ';unitHTML+=cartItem.sellDiscountFormatted+' '+advcheckoutTranslation.EACH_SUFFIX+' ';}else{unitHTML=cartItem.sellFormatted+' '+advcheckoutTranslation.EACH_SUFFIX+' ';}
$(row).find('.price').html(unitHTML);$(row).find('.subtotal').html(cartItem.sellTotalFormatted);var id='#CartItem_qty_'+cartItem.id;$(id).val(cartItem.qty);}
$('#user-grid table tbody tr').each(function(index,element){var rowId=$(element).attr('id');var found=false;for(var i=0;i<shoppingCart.cartItems.length;i+=1){if(rowBaseId+shoppingCart.cartItems[i].id===rowId){found=true;break;}}
if(found===false){$('#'+rowId).addClass('delete');setTimeout(function(){$('#'+rowId).remove();},500);}});$('.cart-subtotal').html(shoppingCart.formattedCartSubtotal);$('.shipping-estimate').html(shoppingCart.formattedShippingPrice);$('.total-estimate').html(shoppingCart.formattedCartTotal);$('.tax1-estimate').html(shoppingCart.formattedCartTax1);$('.tax2-estimate').html(shoppingCart.formattedCartTax2);$('.tax3-estimate').html(shoppingCart.formattedCartTax3);$('.tax4-estimate').html(shoppingCart.formattedCartTax4);$('.tax5-estimate').html(shoppingCart.formattedCartTax5);$('.tax-estimate').html(shoppingCart.formattedCartTax);if(typeof shoppingCart.promoCode==='string'&&shoppingCart.promoCode!==''){$('.webstore-promo-line').removeClass('hide-me');$('.promo-code-name').html(shoppingCart.promoCode);$('.promo-code-str').html(shoppingCart.totalDiscountFormatted);}
else if(cartHasDiscount){$('.webstore-promo-line').removeClass('hide-me');$('.promo-code-str').html(shoppingCart.totalDiscountFormatted);}
else
{$('.webstore-promo-line').addClass('hide-me');$('.promo-code-str').html(shoppingCart.totalDiscountFormatted);}
if(shoppingCart.promoCode===null&&$('.promocode-apply').hasClass('promocode-applied')){this.removePromoCode(cartId);$('#'+cartId+'_em_').find('p').text(cart.INVALID_PROMOCODE).end().hide().fadeIn();}};Checkout.prototype.ajaxClearCart=function(){$.ajax({data:null,type:'POST',url:this.clearCartEndpoint,dataType:'json',success:function(data){if(data.action==='alert'){alert(data.errormsg);}else if(data.action==='success'){return;}}});};Checkout.prototype.applyPromoCode=function(cartId,promoCode){var $promoCodeButton=$('.promocode-apply');$promoCodeButton.addClass('promocode-applied');$promoCodeButton.html(this.removeButtonLabel);$('.webstore-promo-line').show();$('#'+cartId).val(promoCode);$('#'+cartId).prop('readonly',true);$('.promo-code-value').prop('value',promoCode);};Checkout.prototype.removePromoCode=function(cartId){var $this=$('.promocode-apply');$this.removeClass('promocode-applied');$('.webstore-promo-line').hide();$this.html(cart.PROMOCODE_APPLY);$('#'+cartId).val('');$('#'+cartId).prop('readonly',false);};Checkout.prototype.createTooltip=function(targetId,message){this.targetId=targetId;this.creatingTooltip=true;var target=$('#'+targetId),targetOffset=target.offset();var $tooltip=$('<div class=\'alert-tooltip\'>'+message+'</div>');$('body').append($tooltip);$tooltip.offset({top:targetOffset.top-$tooltip.height()/2-50,left:targetOffset.left-$tooltip.width()/2});setTimeout(function(){$tooltip.fadeOut(500,function(){$(this).remove();});},4000);};Checkout.prototype.adjustPosition=function(){var tooltip=$('.alert-tooltip');tooltip.remove();var targetId=this.targetId;var target=$('#'+targetId);var targetOffset=target.offset();if(targetOffset!==null){tooltip.offset({top:targetOffset.top-tooltip.height()/2-50,left:targetOffset.left-tooltip.width()/2});}};function OrderSummary(options){this.setShippingOptionEndpoint=options.setShippingOptionEndpoint;this.$root=$(options.class);this.$shippingProviderId=$('.shipping-provider-id');this.$shippingPriorityLabel=$('.shipping-priority-label');this.cartScenarios=options.cartScenarios||[];this.providerId=null;this.priorityLabel=null;var requiredSelectorsOnce=[this.$root,this.$shippingProviderId,this.$shippingPriorityLabel];for(var selectorIdx in requiredSelectorsOnce){if(requiredSelectorsOnce.hasOwnProperty(selectorIdx)){if(requiredSelectorsOnce[selectorIdx].length===0){throw new Error('Unable to find an element on the page with selector: '+
requiredSelectorsOnce[selectorIdx].selector);}
if(requiredSelectorsOnce[selectorIdx].length>1){throw new Error('Too many elements on the page with selector: '+
requiredSelectorsOnce[selectorIdx].selector);}}}}
OrderSummary.prototype.optionSelected=function(DOMElement){this.providerId=$(DOMElement).attr('data-provider-id')||null;this.priorityLabel=$(DOMElement).attr('data-priority-label')||null;if(this.providerId===null||this.priorityLabel===null){throw new Error('Selected option does not have providerId and priorityLabel data- attributes.');}
this.updateOrderSummary();this.postShippingChoice();this.$shippingProviderId.val(this.providerId);this.$shippingPriorityLabel.val(this.priorityLabel);};OrderSummary.prototype.getSelectedShippingRate=function(){var selectedShippingRate=null,len=this.cartScenarios.length;for(var i=0;i<len;i+=1){if(this.cartScenarios[i].providerId===parseInt(this.providerId)&&this.cartScenarios[i].priorityLabel===this.priorityLabel){selectedShippingRate=this.cartScenarios[i];}}
return selectedShippingRate;};OrderSummary.prototype.updateOrderSummary=function(){var selectedShippingRate=this.getSelectedShippingRate();if(this.getSelectedShippingRate()===null){throw new Error('Cannot find a corresponding shipping rate.');}
this.$root.find('.shipping-estimate').html(selectedShippingRate.formattedShippingPrice);this.$root.find('.tax1-estimate').html(selectedShippingRate.formattedCartTax1);this.$root.find('.tax2-estimate').html(selectedShippingRate.formattedCartTax2);this.$root.find('.tax3-estimate').html(selectedShippingRate.formattedCartTax3);this.$root.find('.tax4-estimate').html(selectedShippingRate.formattedCartTax4);this.$root.find('.tax5-estimate').html(selectedShippingRate.formattedCartTax5);this.$root.find('.total-estimate').html(selectedShippingRate.formattedCartTotal);};OrderSummary.prototype.postShippingChoice=function(){if(this.providerId===null||this.priorityLabel===null){throw new Error('Cannot post a shipping choice with null priorityId or providerLabel');}
$.post(this.setShippingOptionEndpoint,{'CheckoutForm[shippingProviderId]':this.providerId,'CheckoutForm[shippingPriorityLabel]':this.priorityLabel});};function PromoCodeInput(options){this.checkout=options.checkout||null;this.updateCartTotals=options.updateCartTotals||false;this.reloadPageOnSuccess=options.reloadPageOnSuccess||false;this.wsShippingEstimator=options.wsShippingEstimator||null;if(this.checkout===null){throw new Error('Must provide options.checkout to PromoCodeInput');}}
PromoCodeInput.prototype.togglePromoCode=function(cartId){var promise=this.checkout.ajaxTogglePromoCode(cartId,this.updateCartTotals);this.handlePromoCodeChange(promise);};PromoCodeInput.prototype.togglePromoCodeEnterKey=function(event,cartId){var promise=this.checkout.ajaxTogglePromoCodeEnterKey(event,cartId,this.updateCartTotals);this.handlePromoCodeChange(promise);};PromoCodeInput.prototype.handlePromoCodeChange=function(promoCodeChangePromise){if(this.wsShippingEstimator!==null){promoCodeChangePromise.done(function(result){if(result==='success'||result==='triggerCalc'){this.wsShippingEstimator.promoCodeChange(result);}}.bind(this));}
if(this.reloadPageOnSuccess===true){promoCodeChangePromise.done(function(result){if(result==='triggerCalc'||result==='success'){location.reload();}}.bind(this));}};function WsEditCartModal(options){this.checkoutUrl=options.checkoutUrl||null;this.updateCartItemEndpoint=options.updateCartItemEndpoint||'';this.csrfToken=options.csrfToken||null;this.cartId=options.cartId||null;this.invalidQtyMessage=options.invalidQtyMessage||null;this.checkout=options.checkout||null;this.wsShippingEstimator=options.wsShippingEstimator||null;var requiredOptions=['updateCartItemEndpoint','csrfToken','cartId','invalidQtyMessage'];requiredOptions.forEach(function(option){if(this[option]===null){throw new Error('Must provide options.'+option);}}.bind(this));this.requestsInProgress=0;}
WsEditCartModal.prototype.updateCart=function(DOMInput){this.updateCartItemQty($(DOMInput).attr('data-pk'),DOMInput.value).done(function(updateResponse){if(updateResponse.updateResult.errorId==='invalidQuantity'){$(DOMInput).val(updateResponse.updateResult.availQty);$(DOMInput).change();this.checkout.createTooltip(DOMInput.id,this.invalidQtyMessage.replace('{qty}',updateResponse.updateResult.availQty));}}.bind(this));};WsEditCartModal.prototype.removeItem=function(DOMInput){var cartItemId=DOMInput.getAttribute('data-pk');this.updateCartItemQty(cartItemId,0);};WsEditCartModal.prototype.updateCartItemQty=function(cartItemId,qty){if(typeof cartItemId==='undefined'||typeof qty==='undefined'){throw new Error('Must provide a cartItemId and a qty.');}
this.incrementPendingRequests();var returnValue=$.ajax({url:this.updateCartItemEndpoint,type:'POST',dataType:'json',data:{YII_CSRF_TOKEN:this.csrfToken,'CartItem[id]':cartItemId,'CartItem[qty]':qty}}).done(function(updateResponse){if(updateResponse.updateResult.action==='success'){this.checkout.redrawCart(updateResponse.shoppingCart,this.cartId);$('#cartItemsTotal').text(updateResponse.shoppingCart.cartItems.length);if(this.wsShippingEstimator!==null){this.incrementPendingRequests();this.wsShippingEstimator.updateShippingEstimates().done(function(shippingRatesResponse){if(typeof this.pendingRequestsComplete==='function'&&this.shippingResponsePreventsCheckout(shippingRatesResponse)===true){this.pendingRequestsComplete=null;}}.bind(this)).always(function(){this.decrementPendingRequests();}.bind(this));return;}}
if(updateResponse.updateResult==='error'&&updateResponse.updateResult.errormsg){alert(updateResponse.updateResult.errormsg);}}.bind(this)).fail(function(){}.bind(this)).always(function(){this.decrementPendingRequests();}.bind(this));return returnValue;};WsEditCartModal.prototype.shippingResponsePreventsCheckout=function(shippingRatesResponse){var message;if(shippingRatesResponse.result!=='success'){return true;}
var messages=shippingRatesResponse.wsShippingEstimatorOptions.messages;if(typeof messages!=='object'){return false;}
for(var i=0,len=messages.length;i<len;i+=1){message=messages[i];if(message.code==='WARN'){return true;}}
return false;};WsEditCartModal.prototype.hasPendingRequests=function(){return(this.requestsInProgress>0);};WsEditCartModal.prototype.incrementPendingRequests=function(){this.requestsInProgress+=1;};WsEditCartModal.prototype.decrementPendingRequests=function(){this.requestsInProgress-=1;if(this.requestsInProgress===0&&typeof this.pendingRequestsComplete==='function'){this.pendingRequestsComplete();}};WsEditCartModal.prototype.goToCheckout=function(){if(this.hasPendingRequests()===false){window.location.href=this.checkoutUrl;return;}
this.pendingRequestsComplete=function(){window.location.href=this.checkoutUrl;};};function CreditCard(options){var enabledCardTypes=options.enabledCardTypes,cardTypeNotSupported=options.cardTypeNotSupported;if(typeof enabledCardTypes==='undefined'||typeof cardTypeNotSupported==='undefined'){throw new Error('Must provide enabledCardTypes and cardTypeNotSupported options.');}
var cardTypeMap={'visaelectron':'Visa Electron','maestro':'Maestro','visa':'Visa','mastercard':'MasterCard','amex':'American Express','dinersclub':'Diners Club','discover':'Discover','jcb':'JCB'};$('[data-numeric]').payment('restrictNumeric');$('.creditcard-number').payment('formatCardNumber');$('.cc-exp').payment('formatCardExpiry');$('.cvv').payment('formatCardCVC');var removeErrorHolder=function(){var $errorHolderElement=$('form > .creditcard > .error-holder'),$formErrorElement=$errorHolderElement.find('.form-error');$formErrorElement.remove();};var setNotSupportedMessage=function(message){var $notSupportedElement=$('.credit-card-not-supported-error'),$errorHolderElement=$('form > .creditcard > .error-holder'),$formErrorElement=$errorHolderElement.find('.form-error');if($notSupportedElement.length===0){if($formErrorElement.length===0){$formErrorElement=$('<div class="form-error">').appendTo($errorHolderElement);}
$formErrorElement.append('<p class="credit-card-not-supported-error">'+message+'</p>');}else{$notSupportedElement.html(message);}};$('.creditcard-number').keyup(function(){removeErrorHolder();$('.card-logo div').removeClass('active');var cardType=$.payment.cardType($('.creditcard-number').val());if(cardType===null){$('.card-type').val('');return;}
var mappedCardType=cardTypeMap[cardType]||cardType.toUpperCase;$('.card-logo .'+cardType).addClass('active');$('.card-type').val(mappedCardType);var isEnabled=false;for(var idx=0,numCardTypes=enabledCardTypes.length;idx<numCardTypes;idx+=1){if(mappedCardType===enabledCardTypes[idx]){isEnabled=true;}}
if(isEnabled===false){setNotSupportedMessage(cardTypeNotSupported.replace(/{card type}/,mappedCardType));}});}
$(document).on('click',function(){if(Checkout.creatingTooltip===false){$('.alert-tooltip').fadeOut(500,function(){$(this).remove();});}
Checkout.creatingTooltip=false;});$(document).on('click','#cart .exit, #cart .continue',function(){hideModal();});

(function(w){var ua=navigator.userAgent;if(!(/iPhone|iPad|iPod/.test(navigator.platform)&&/OS [1-5]_[0-9_]* like Mac OS X/i.test(ua)&&ua.indexOf("AppleWebKit")>-1)){return;}
var doc=w.document;if(!doc.querySelector){return;}
var meta=doc.querySelector("meta[name=viewport]"),initialContent=meta&&meta.getAttribute("content"),disabledZoom=initialContent+",maximum-scale=1",enabledZoom=initialContent+",maximum-scale=10",enabled=true,x,y,z,aig;if(!meta){return;}
function restoreZoom(){meta.setAttribute("content",enabledZoom);enabled=true;}
function disableZoom(){meta.setAttribute("content",disabledZoom);enabled=false;}
function checkTilt(e){aig=e.accelerationIncludingGravity;x=Math.abs(aig.x);y=Math.abs(aig.y);z=Math.abs(aig.z);if((!w.orientation||w.orientation===180)&&(x>7||((z>6&&y<8||z<8&&y>6)&&x>5))){if(enabled){disableZoom();}}
else if(!enabled){restoreZoom();}}
w.addEventListener("orientationchange",restoreZoom,false);w.addEventListener("devicemotion",checkTilt,false);})(this);
