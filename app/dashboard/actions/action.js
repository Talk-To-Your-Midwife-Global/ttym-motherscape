"use server";
import { cookies } from "next/headers";
import { PUBLICHOSTNAME } from "@/app/_config/main";
import { formatDate } from "@/app/_lib/functions";
import { getLocalCookies } from "@/app/_lib/getCookies";
import { Log } from "@/app/_lib/utils";
import { decrypt } from "@/app/_actions/auth";
import posthog from "posthog-js";
import { format } from "date-fns";

export async function updateUserFlowInfoAction(id, reqBody) {
  if (!id) {
    return {
      success: false,
      msg: "No ID"
    };
  }

  const { access_token: encryptedAccessToken } = await getLocalCookies(["access_token"]);
  let accessToken = null;

  if (encryptedAccessToken) {
    try {
      accessToken = await decrypt(encryptedAccessToken);
    } catch (err) {
      posthog.captureException("dashboard/actions updateUserFlowInfo: Failed to decrypt token");
    }
  }
  try {
    const response = await fetch(`${PUBLICHOSTNAME}/menstrual/cycles/${id}/`, {
      method: "PUT",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken
      }
    });
    if (!response.ok) {
      return {
        success: false
      };
    }

    Log("Dashboard/actions/action.js; updateUserFlowInfo");
    return {
      success: true
    };
  } catch (error) {
    posthog.captureException(error);
    return {
      success: false
    };
  }
}


export async function startCycle(date) {
  const day = format(date, "yyyy-MM-dd");
  const { access_token: encryptedAccessToken } = await getLocalCookies(["access_token"]);
  let access_token = null;
  if (encryptedAccessToken) {
    try {
      access_token = await decrypt(encryptedAccessToken);
    } catch (e) {
      Log("action.js; startCycle failed to decrypt access token", e);
    }
  }
  Log("Dashboard/actions/action.js; startCycle", { access_token });
  try {
    const response = await fetch(`${PUBLICHOSTNAME}/menstrual/cycles/start/`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${access_token}`
      },
      method: "POST",
      body: JSON.stringify({
        start_date: day
      })
    });
    if (!response.ok) {
      Log("Dashboard/actions/action.js; startCycle", { response });
      return {
        success: false
      };
    }
    const data = await response.json();
    Log("Dashboard/actions/action.js; startCycle", { data });
    if (data) {
      return {
        success: true
      };
    }
  } catch (e) {
    posthog.captureException(e);
    return {
      success: false
    };
  }
}


export async function contentGqlFetcher(query, variables) {
  Log(JSON.stringify({ query, variables }));
  const response = await fetch(`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.CONTENTFUL_TOKEN}`
      },
      body: JSON.stringify({ query, variables })
    });

  if (!response.ok) {
    Log("failed_contentgqlfetcher", { response });
    throw new Error(response.statusText);
  }

  const { data, errors } = await response.json();
  Log(data);
  return data;
}


export async function bookmarkPost(postId) {
  const { access_token: encryptedAccessToken } = await getLocalCookies(["access_token"]);
  let access_token = null;
  if (encryptedAccessToken) {
    try {
      access_token = await decrypt(encryptedAccessToken);
    } catch (e) {
      Log("action.js; bookmarkPost failed to decrypt access token", e);
    }
  }

  const response = await fetch(`${PUBLICHOSTNAME}/bookmark/${postId}`, {
    headers: {
      "Authorization": `Bearer ${access_token}`
    }
  });
  Log(response);
  if (!response.ok) {
    Log({ data });
    return {
      marked: false
    };
  }
  const data = await response.json();
  Log({ data });
  return {
    marked: data.isBookmarked
  };
}


// todo: remove this
export async function unbookmarkPost(postId, accessToken) {
  const response = await fetch(`${PUBLICHOSTNAME}/bookmark/${postId}`, {
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  });
  if (!response.ok) {
    return {
      marked: true
    };
  }
  return {
    marked: false
  };
}

export async function logLog(state, accessToken, userType, date, method = "POST") {
  const { moods, symptoms } = state;
  const jsonBody = JSON.stringify({
    mood: moods,
    symptoms,
    date: formatDate(date)
  });
  Log("Dashboard/actions/action.js logLog: request objects", { date, state, jsonBody });

  const response = await fetch(`${PUBLICHOSTNAME}/logs/`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    },
    body: jsonBody
  });
  const res = await response.json();
  if (!response.ok) {
    Log("Dashboard/actions/action.js logLog: User symptoms and moods Log failure response", { res });
    return {
      success: false,
      data: res
    };
  }

  Log("Dashboard/actions/action.js logLog: User symptoms and moods Log successfully response", { res });
  return {
    success: true,
    data: res
  };
}