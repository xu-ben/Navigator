<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!doctype html>
<html>
	<head>
		<title>我的网址导航</title>
		<meta content="导航" name="keywords"/>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
		<link rel=stylesheet href="index.css" type="text/css">
		<script type="text/javascript" src="dateandtime.js" charset="utf-8">
		</script>
		<script type="text/javascript" src="scroll.js" charset="utf-8">
		</script>
		<script type="text/javascript" src="client.js" charset="utf-8">
		</script>
		<script type="text/javascript" src="content.js" charset="utf-8">
		</script>
		<script type="text/javascript" src="index.js" charset="utf-8">
		</script>
	</head>
	<body>
		<div id = "wrapper">
			<div id = "pagewindow">
				<div id = "pagecont">
				</div>
			</div>
			<br/>
			<div align="center" id="bottom">
				<span id="mydate">
					<script type="text/javascript">
			            var date = new ChineseCalendar();
            			document.write(date.YYMMDD() + " " + date.weekday() + " " + date.solarDay2());
			        </script>	
				</span>
				<span id="mytime"></span>
				<span> 本机外网ip:<%=request.getRemoteAddr()%></span>
			</div>
		</div>
	</body>
</html>
